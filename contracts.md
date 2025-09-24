# Backend Integration Contracts - i-Notarize-Online

## Overview
This document outlines the API contracts, data models, and integration points between the frontend and backend for the notary service landing page.

## Current Mock Data (to be replaced)
- Contact form submissions (mock alert)
- Service pricing data (hardcoded in components)
- Testimonials and business info (static data)
- Coverage areas and business hours (static data)

## Required Backend Endpoints

### 1. Contact & Booking API
**POST /api/contact/submit**
```json
Request Body:
{
  "name": "string (required)",
  "email": "string (required)", 
  "phone": "string (required)",
  "serviceType": "remote|mobile|bulk",
  "documentType": "string (optional)",
  "preferredDate": "string (optional)",
  "message": "string (optional)",
  "urgency": "normal|rush" (optional)
}

Response:
{
  "success": boolean,
  "message": "string", 
  "reference": "string (REQ-XXXXXX)",
  "estimatedResponse": "string"
}
```

### 2. Business Data API
**GET /api/business/info**
```json
Response:
{
  "businessName": "string",
  "notaryName": "string", 
  "license": "string",
  "phone": "string",
  "email": "string",
  "serviceArea": "string"
}
```

**GET /api/business/hours**
```json
Response:
{
  "remote": "string",
  "mobile": "string", 
  "phoneSupport": "string",
  "weekend": "string"
}
```

### 3. Services & Pricing API
**GET /api/services**
```json
Response:
[
  {
    "id": "string",
    "name": "string",
    "basePrice": number,
    "description": "string", 
    "features": ["string"],
    "availability": "string"
  }
]
```

**GET /api/pricing/additional**
```json
Response:
[
  {
    "service": "string",
    "price": number,
    "unit": "string (optional)"
  }
]
```

### 4. Coverage & Service Areas API
**GET /api/coverage/mobile**
```json
Response:
{
  "areas": ["string"],
  "travelFees": [
    {
      "area": "string", 
      "fee": number|string,
      "description": "string"
    }
  ]
}
```

**GET /api/coverage/remote**
```json
Response:
{
  "areas": ["string"],
  "restrictions": ["string"]
}
```

### 5. Testimonials API
**GET /api/testimonials**
```json
Response:
[
  {
    "id": number,
    "name": "string",
    "role": "string",
    "content": "string", 
    "rating": number,
    "date": "string",
    "verified": boolean
  }
]
```

### 6. Statistics API
**GET /api/stats**
```json
Response:
{
  "documentsNotarized": "string",
  "averageRating": "string", 
  "averageSessionTime": "string",
  "serviceAvailability": "string"
}
```

## Database Models

### ContactSubmission
```python
class ContactSubmission(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    service_type: str
    document_type: Optional[str]
    preferred_date: Optional[str]
    message: Optional[str]
    urgency: str = "normal"
    status: str = "new"  # new, contacted, scheduled, completed
    created_at: datetime
    updated_at: datetime
```

### BusinessConfig
```python
class BusinessConfig(BaseModel):
    id: str
    key: str  # "business_info", "hours", "stats", etc.
    data: dict  # JSON data for flexibility
    updated_at: datetime
```

### Service
```python
class Service(BaseModel):
    id: str
    name: str
    base_price: Optional[float]
    description: str
    features: List[str]
    availability: str
    active: bool = True
    created_at: datetime
```

### Testimonial
```python
class Testimonial(BaseModel):
    id: str
    name: str
    role: str
    content: str
    rating: int
    date: str
    verified: bool = False
    active: bool = True
    created_at: datetime
```

## Frontend Integration Points

### Current Mock Functions (to be replaced):
1. `mockContactSubmit()` → API call to `/api/contact/submit`
2. Static data in components → API calls during component mount
3. Hard-coded pricing → Dynamic data from `/api/services`
4. Static testimonials → API call to `/api/testimonials`

### Integration Steps:
1. Create API service layer in `/frontend/src/services/api.js`
2. Replace mock data imports with API calls
3. Add loading states for data fetching
4. Implement error handling for failed API calls
5. Add form validation feedback

### Environment Variables:
- Frontend: Use existing `REACT_APP_BACKEND_URL`
- Backend: Add email configuration for contact notifications

## Email Integration (Optional Enhancement)
- Send notification emails when contact form is submitted
- Send confirmation emails to customers
- Admin dashboard for managing inquiries

## Error Handling Strategy
- Graceful degradation if API calls fail
- Loading spinners for async operations
- User-friendly error messages
- Retry mechanisms for failed requests

## Testing Requirements
- Test all API endpoints with valid/invalid data
- Test frontend error handling with network failures
- Test form submission flow end-to-end
- Test responsive behavior with real data

## Security Considerations
- Input validation on all API endpoints
- Rate limiting on contact form submissions
- CORS configuration for frontend domain
- Data sanitization before database storage

## Implementation Priority
1. **High Priority**: Contact form API (core functionality)
2. **Medium Priority**: Business data APIs (content management)
3. **Low Priority**: Statistics and testimonials APIs (enhancement)

This contract ensures seamless integration between frontend mock data and backend reality while maintaining the existing user experience.