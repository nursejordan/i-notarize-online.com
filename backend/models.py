from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

# Contact submission model
class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    service_type: str = Field(..., pattern="^(remote|mobile|bulk)$")
    document_type: Optional[str] = Field(None, max_length=100)
    preferred_date: Optional[str] = None
    message: Optional[str] = Field(None, max_length=1000)
    urgency: str = Field(default="normal", pattern="^(normal|rush)$")

class ContactSubmission(ContactSubmissionCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = Field(default="new")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    reference: str = Field(default_factory=lambda: f"REQ-{int(datetime.utcnow().timestamp())}")

# Service model
class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    base_price: Optional[float] = None
    description: str
    features: List[str]
    availability: str
    active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ServiceResponse(Service):
    pass

# Business configuration model
class BusinessConfig(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    key: str
    data: Dict[str, Any]
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Testimonial model
class TestimonialCreate(BaseModel):
    name: str = Field(..., max_length=100)
    role: str = Field(..., max_length=100)
    content: str = Field(..., max_length=500)
    rating: int = Field(..., ge=1, le=5)
    date: str

class Testimonial(TestimonialCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    verified: bool = Field(default=False)
    active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Additional service pricing model
class AdditionalService(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    service: str
    price: float
    unit: Optional[str] = None
    active: bool = True

# Coverage area models
class TravelFee(BaseModel):
    area: str
    fee: str  # Can be number or string like "$25" or "1/mile"
    description: str

class CoverageArea(BaseModel):
    mobile_areas: List[str]
    remote_areas: List[str]
    travel_fees: List[TravelFee]

# Business hours model
class BusinessHours(BaseModel):
    remote: str
    mobile: str
    phone_support: str
    weekend: str

# Business information model
class BusinessInfo(BaseModel):
    business_name: str
    notary_name: str
    license: str
    phone: str
    email: str
    service_area: str

# Statistics model
class BusinessStats(BaseModel):
    documents_notarized: str
    average_rating: str
    average_session_time: str
    service_availability: str

# API Response models
class ContactSubmissionResponse(BaseModel):
    success: bool
    message: str
    reference: str
    estimated_response: str

class ApiResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None

class ErrorResponse(BaseModel):
    success: bool = False
    message: str
    error_code: Optional[str] = None