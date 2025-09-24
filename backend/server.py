from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from typing import List
from models import *
from database import *
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="i-Notarize-Online API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "i-Notarize-Online API is running", "version": "1.0.0"}

# Contact submission endpoints
@api_router.post("/contact/submit", response_model=ContactSubmissionResponse)
async def submit_contact_form(submission: ContactSubmissionCreate):
    try:
        # Create contact submission record
        contact_record = ContactSubmission(**submission.dict())
        
        # Insert into database
        await contact_submissions.insert_one(contact_record.dict())
        
        # Calculate estimated response time based on urgency
        estimated_response = "within 1 hour" if submission.urgency == "rush" else "within 2 hours"
        
        return ContactSubmissionResponse(
            success=True,
            message="Thank you for your request! We will contact you soon to confirm your appointment.",
            reference=contact_record.reference,
            estimated_response=estimated_response
        )
        
    except Exception as e:
        logging.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contact/submissions", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """Admin endpoint to get all contact submissions"""
    try:
        submissions = await contact_submissions.find().sort("created_at", -1).to_list(100)
        return [ContactSubmission(**submission) for submission in submissions]
    except Exception as e:
        logging.error(f"Error retrieving submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve submissions")

# Business data endpoints
@api_router.get("/business/info")
async def get_business_info():
    try:
        info = await get_business_config("business_info")
        if not info:
            raise HTTPException(status_code=404, detail="Business info not found")
        return info
    except Exception as e:
        logging.error(f"Error getting business info: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get business info")

@api_router.get("/business/hours")
async def get_business_hours():
    try:
        hours = await get_business_config("business_hours")
        if not hours:
            raise HTTPException(status_code=404, detail="Business hours not found")
        return hours
    except Exception as e:
        logging.error(f"Error getting business hours: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get business hours")

@api_router.get("/business/stats")
async def get_business_stats():
    try:
        stats = await get_business_config("business_stats")
        if not stats:
            raise HTTPException(status_code=404, detail="Business stats not found")
        return stats
    except Exception as e:
        logging.error(f"Error getting business stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get business stats")

# Services endpoints
@api_router.get("/services", response_model=List[ServiceResponse])
async def get_services():
    try:
        service_list = await services.find({"active": True}).to_list(100)
        return [ServiceResponse(**service) for service in service_list]
    except Exception as e:
        logging.error(f"Error getting services: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get services")

@api_router.get("/pricing/additional", response_model=List[AdditionalService])
async def get_additional_pricing():
    try:
        additional_list = await additional_services.find({"active": True}).to_list(100)
        return [AdditionalService(**service) for service in additional_list]
    except Exception as e:
        logging.error(f"Error getting additional services: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get additional services")

# Coverage endpoints
@api_router.get("/coverage")
async def get_coverage_areas():
    try:
        coverage = await get_business_config("coverage_areas")
        if not coverage:
            raise HTTPException(status_code=404, detail="Coverage areas not found")
        return coverage
    except Exception as e:
        logging.error(f"Error getting coverage areas: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get coverage areas")

# Testimonials endpoints
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(limit: int = 10):
    try:
        testimonial_list = await testimonials.find(
            {"active": True, "verified": True}
        ).sort("created_at", -1).limit(limit).to_list(limit)
        return [Testimonial(**testimonial) for testimonial in testimonial_list]
    except Exception as e:
        logging.error(f"Error getting testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get testimonials")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
