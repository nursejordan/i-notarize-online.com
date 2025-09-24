import os
from motor.motor_asyncio import AsyncIOMotorClient
from models import *
from datetime import datetime

# Database connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'notary_service')]

# Collections
contact_submissions = db.contact_submissions
services = db.services
business_configs = db.business_configs
testimonials = db.testimonials
additional_services = db.additional_services

async def init_database():
    """Initialize database with seed data"""
    
    # Check if data already exists
    if await services.count_documents({}) > 0:
        print("Database already initialized")
        return
    
    print("Initializing database with seed data...")
    
    # Seed services data
    services_data = [
        Service(
            id="remote",
            name="Remote Online Notarization",
            base_price=25.0,
            description="Secure video-based notarization from anywhere in the world. Perfect for busy professionals and urgent documents.",
            features=["24/7 Availability", "Legally Binding", "Instant Delivery"],
            availability="24/7"
        ),
        Service(
            id="mobile",
            name="Mobile Notary Service", 
            base_price=75.0,
            description="I come to you anywhere in the greater New York area. Perfect for real estate closings and bulk documents.",
            features=["Same-Day Service", "NYC Metro Area", "Volume Discounts"],
            availability="8 AM - 8 PM"
        ),
        Service(
            id="bulk",
            name="Bulk Services",
            base_price=None,
            description="Custom pricing for businesses and law firms with volume notarization needs.",
            features=["Volume Pricing", "Priority Scheduling", "Dedicated Support"],
            availability="By Appointment"
        )
    ]
    
    for service in services_data:
        await services.insert_one(service.dict())
    
    # Seed business configuration
    business_info = BusinessConfig(
        key="business_info",
        data={
            "business_name": "i-Notarize-Online",
            "notary_name": "Yordanos Mathewos",
            "license": "NY-2024-001234", 
            "phone": "(555) 123-4567",
            "email": "yordanos@i-notarize-online.com",
            "service_area": "Greater New York Area & Worldwide"
        }
    )
    await business_configs.insert_one(business_info.dict())
    
    # Business hours
    business_hours = BusinessConfig(
        key="business_hours",
        data={
            "remote": "24/7",
            "mobile": "8 AM - 8 PM",
            "phone_support": "7 AM - 10 PM",
            "weekend": "Available"
        }
    )
    await business_configs.insert_one(business_hours.dict())
    
    # Coverage areas
    coverage_data = BusinessConfig(
        key="coverage_areas",
        data={
            "mobile_areas": [
                "Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island",
                "Long Island", "Westchester", "Nassau County", "Suffolk County"
            ],
            "remote_areas": [
                "All 50 US States", "Washington DC", "Puerto Rico",
                "International (US Citizens)", "Military (APO/FPO)"
            ],
            "travel_fees": [
                {
                    "area": "Manhattan & Brooklyn",
                    "fee": "$0",
                    "description": "No travel fee within 10 miles"
                },
                {
                    "area": "Queens, Bronx, Staten Island",
                    "fee": "$25", 
                    "description": "Flat rate within boroughs"
                },
                {
                    "area": "Long Island, Westchester",
                    "fee": "$1/mile",
                    "description": "Per mile beyond 25 mile radius"
                }
            ]
        }
    )
    await business_configs.insert_one(coverage_data.dict())
    
    # Business statistics
    stats_data = BusinessConfig(
        key="business_stats",
        data={
            "documents_notarized": "500+",
            "average_rating": "4.9",
            "average_session_time": "15min",
            "service_availability": "24/7"
        }
    )
    await business_configs.insert_one(stats_data.dict())
    
    # Seed testimonials
    testimonials_data = [
        Testimonial(
            name="Sarah Johnson",
            role="Real Estate Agent", 
            content="Yordanos made our urgent closing possible with her remote service. Professional, quick, and legally compliant. Highly recommended!",
            rating=5,
            date="2024-01-15",
            verified=True
        ),
        Testimonial(
            name="Michael Chen",
            role="Business Owner",
            content="Needed multiple documents notarized for my business. The mobile service was convenient and saved me hours of travel time.",
            rating=5, 
            date="2024-01-10",
            verified=True
        ),
        Testimonial(
            name="Lisa Rodriguez",
            role="Healthcare Professional",
            content="Perfect for my busy schedule. The remote notarization was seamless and the documents were ready immediately.",
            rating=5,
            date="2024-01-08",
            verified=True
        )
    ]
    
    for testimonial in testimonials_data:
        await testimonials.insert_one(testimonial.dict())
    
    # Seed additional services
    additional_services_data = [
        AdditionalService(
            service="Document scan & prep",
            price=10.0
        ),
        AdditionalService(
            service="Rush processing (< 2 hours)",
            price=15.0
        ),
        AdditionalService(
            service="Certified copies",
            price=5.0,
            unit="each"
        ),
        AdditionalService(
            service="Apostille coordination", 
            price=25.0
        )
    ]
    
    for service in additional_services_data:
        await additional_services.insert_one(service.dict())
    
    print("Database initialized successfully!")

# Helper functions
async def get_business_config(key: str):
    """Get business configuration by key"""
    config = await business_configs.find_one({"key": key})
    return config["data"] if config else None

async def update_business_config(key: str, data: dict):
    """Update business configuration"""
    await business_configs.update_one(
        {"key": key},
        {"$set": {"data": data, "updated_at": datetime.utcnow()}},
        upsert=True
    )