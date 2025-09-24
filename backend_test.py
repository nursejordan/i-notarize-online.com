#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Notary Service Landing Page
Tests all endpoints, validation, error handling, and database operations
"""

import asyncio
import aiohttp
import json
import sys
from datetime import datetime
from typing import Dict, Any, List

# Backend URL from environment
BACKEND_URL = "https://mobile-notary-nyc.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.session = None
        self.test_results = []
        self.failed_tests = []
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"    Details: {details}")
        if not success:
            self.failed_tests.append(result)
        print()
    
    async def test_health_check(self):
        """Test basic API health check"""
        try:
            async with self.session.get(f"{BACKEND_URL}/") as response:
                if response.status == 200:
                    data = await response.json()
                    if "message" in data and "version" in data:
                        self.log_test("Health Check", True, f"API running version {data.get('version')}", data)
                    else:
                        self.log_test("Health Check", False, "Missing expected fields in response", data)
                else:
                    self.log_test("Health Check", False, f"HTTP {response.status}: {await response.text()}")
        except Exception as e:
            self.log_test("Health Check", False, f"Connection error: {str(e)}")
    
    async def test_contact_form_valid_submission(self):
        """Test contact form with valid data"""
        valid_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "phone": "5551234567",
            "service_type": "remote",
            "document_type": "Power of Attorney",
            "preferred_date": "2024-02-15",
            "message": "I need to notarize a power of attorney document for my elderly parent.",
            "urgency": "normal"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/contact/submit",
                json=valid_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                
                if response.status == 200:
                    required_fields = ["success", "message", "reference", "estimated_response"]
                    if all(field in data for field in required_fields):
                        if data["success"] and data["reference"].startswith("REQ-"):
                            self.log_test("Contact Form - Valid Submission", True, 
                                        f"Reference: {data['reference']}, Response time: {data['estimated_response']}", data)
                        else:
                            self.log_test("Contact Form - Valid Submission", False, 
                                        "Success=False or invalid reference format", data)
                    else:
                        missing = [f for f in required_fields if f not in data]
                        self.log_test("Contact Form - Valid Submission", False, 
                                    f"Missing required fields: {missing}", data)
                else:
                    self.log_test("Contact Form - Valid Submission", False, 
                                f"HTTP {response.status}: {await response.text()}")
        except Exception as e:
            self.log_test("Contact Form - Valid Submission", False, f"Request error: {str(e)}")
    
    async def test_contact_form_invalid_email(self):
        """Test contact form with invalid email"""
        invalid_data = {
            "name": "Jane Doe",
            "email": "invalid-email",
            "phone": "5551234567",
            "service_type": "mobile",
            "urgency": "rush"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/contact/submit",
                json=invalid_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:  # Validation error expected
                    data = await response.json()
                    self.log_test("Contact Form - Invalid Email", True, 
                                "Correctly rejected invalid email", data)
                else:
                    self.log_test("Contact Form - Invalid Email", False, 
                                f"Expected 422, got {response.status}: {await response.text()}")
        except Exception as e:
            self.log_test("Contact Form - Invalid Email", False, f"Request error: {str(e)}")
    
    async def test_contact_form_missing_required_fields(self):
        """Test contact form with missing required fields"""
        incomplete_data = {
            "name": "Bob Johnson",
            "email": "bob@example.com"
            # Missing phone and service_type
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/contact/submit",
                json=incomplete_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:  # Validation error expected
                    data = await response.json()
                    self.log_test("Contact Form - Missing Required Fields", True, 
                                "Correctly rejected incomplete data", data)
                else:
                    self.log_test("Contact Form - Missing Required Fields", False, 
                                f"Expected 422, got {response.status}: {await response.text()}")
        except Exception as e:
            self.log_test("Contact Form - Missing Required Fields", False, f"Request error: {str(e)}")
    
    async def test_contact_form_invalid_service_type(self):
        """Test contact form with invalid service type"""
        invalid_service_data = {
            "name": "Alice Brown",
            "email": "alice@example.com",
            "phone": "5551234567",
            "service_type": "invalid_service",
            "urgency": "normal"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/contact/submit",
                json=invalid_service_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status == 422:  # Validation error expected
                    data = await response.json()
                    self.log_test("Contact Form - Invalid Service Type", True, 
                                "Correctly rejected invalid service type", data)
                else:
                    self.log_test("Contact Form - Invalid Service Type", False, 
                                f"Expected 422, got {response.status}: {await response.text()}")
        except Exception as e:
            self.log_test("Contact Form - Invalid Service Type", False, f"Request error: {str(e)}")
    
    async def test_contact_form_edge_cases(self):
        """Test contact form with edge cases"""
        edge_case_data = {
            "name": "María José González-Smith",  # Special characters
            "email": "maria.jose+test@example-domain.co.uk",  # Complex email
            "phone": "+1-555-123-4567",  # Formatted phone
            "service_type": "bulk",
            "document_type": "Multiple contracts & agreements",
            "message": "A" * 999,  # Very long message (within limit)
            "urgency": "rush"
        }
        
        try:
            async with self.session.post(
                f"{BACKEND_URL}/contact/submit",
                json=edge_case_data,
                headers={"Content-Type": "application/json"}
            ) as response:
                data = await response.json()
                
                if response.status == 200:
                    if data.get("success") and data.get("reference"):
                        self.log_test("Contact Form - Edge Cases", True, 
                                    "Successfully handled special characters and long message", data)
                    else:
                        self.log_test("Contact Form - Edge Cases", False, 
                                    "Submission failed despite valid data", data)
                else:
                    self.log_test("Contact Form - Edge Cases", False, 
                                f"HTTP {response.status}: {await response.text()}")
        except Exception as e:
            self.log_test("Contact Form - Edge Cases", False, f"Request error: {str(e)}")
    
    async def test_business_info_api(self):
        """Test business info API"""
        try:
            async with self.session.get(f"{BACKEND_URL}/business/info") as response:
                if response.status == 200:
                    data = await response.json()
                    required_fields = ["business_name", "notary_name", "license", "phone", "email", "service_area"]
                    
                    if all(field in data for field in required_fields):
                        self.log_test("Business Info API", True, 
                                    f"Retrieved business info for {data.get('notary_name')}", data)
                    else:
                        missing = [f for f in required_fields if f not in data]
                        self.log_test("Business Info API", False, 
                                    f"Missing required fields: {missing}", data)
                else:
                    self.log_test("Business Info API", False, 
                                f"HTTP {response.status}: {await response.text()}")
        except Exception as e:
            self.log_test("Business Info API", False, f"Request error: {str(e)}")
    
    async def test_business_hours_api(self):
        """Test business hours API"""
        try:
            async with self.session.get(f"{BACKEND_URL}/business/hours") as response:
                if response.status == 200:
                    data = await response.json()
                    required_fields = ["remote", "mobile", "phone_support", "weekend"]
                    
                    if all(field in data for field in required_fields):
                        self.log_test("Business Hours API", True, 
                                    f"Retrieved hours - Remote: {data.get('remote')}, Mobile: {data.get('mobile')}", data)
                    else:
                        missing = [f for f in required_fields if f not in data]
                        self.log_test("Business Hours API", False, 
                                    f"Missing required fields: {missing}", data)
                else:
                    self.log_test("Business Hours API", False, 
                                f"HTTP {response.status}: {await response.text()}")
        except Exception as e:
            self.log_test("Business Hours API", False, f"Request error: {str(e)}")
    
    async def test_business_stats_api(self):
        """Test business stats API"""
        try:
            async with self.session.get(f"{BACKEND_URL}/business/stats") as response:
                if response.status == 200:
                    data = await response.json()
                    required_fields = ["documents_notarized", "average_rating", "average_session_time", "service_availability"]
                    
                    if all(field in data for field in required_fields):
                        self.log_test("Business Stats API", True, 
                                    f"Retrieved stats - Documents: {data.get('documents_notarized')}, Rating: {data.get('average_rating')}", data)
                    else:
                        missing = [f for f in required_fields if f not in data]
                        self.log_test("Business Stats API", False, 
                                    f"Missing required fields: {missing}", data)
                else:
                    self.log_test("Business Stats API", False, 
                                f"HTTP {response.status}: {await response.text()}")
        except Exception as e:
            self.log_test("Business Stats API", False, f"Request error: {str(e)}")
    
    async def test_services_api(self):
        """Test services API"""
        try:
            async with self.session.get(f"{BACKEND_URL}/services") as response:
                if response.status == 200:
                    data = await response.json()
                    
                    if isinstance(data, list) and len(data) > 0:
                        # Check first service structure
                        service = data[0]
                        required_fields = ["id", "name", "description", "features", "availability", "active"]
                        
                        if all(field in service for field in required_fields):
                            service_names = [s.get("name") for s in data]
                            self.log_test("Services API", True, 
                                        f"Retrieved {len(data)} services: {', '.join(service_names)}", data)
                        else:
                            missing = [f for f in required_fields if f not in service]
                            self.log_test("Services API", False, 
                                        f"Missing required fields in service: {missing}", data)
                    else:
                        self.log_test("Services API", False, 
                                    "Expected non-empty array of services", data)
                else:
                    self.log_test("Services API", False, 
                                f"HTTP {response.status}: {await response.text()}")
        except Exception as e:
            self.log_test("Services API", False, f"Request error: {str(e)}")
    
    async def test_additional_pricing_api(self):
        """Test additional pricing API"""
        try:
            async with self.session.get(f"{BACKEND_URL}/pricing/additional") as response:
                if response.status == 200:
                    data = await response.json()
                    
                    if isinstance(data, list) and len(data) > 0:
                        # Check first service structure
                        service = data[0]
                        required_fields = ["id", "service", "price", "active"]
                        
                        if all(field in service for field in required_fields):
                            services = [f"{s.get('service')}: ${s.get('price')}" for s in data]
                            self.log_test("Additional Pricing API", True, 
                                        f"Retrieved {len(data)} additional services: {', '.join(services)}", data)
                        else:
                            missing = [f for f in required_fields if f not in service]
                            self.log_test("Additional Pricing API", False, 
                                        f"Missing required fields: {missing}", data)
                    else:
                        self.log_test("Additional Pricing API", False, 
                                    "Expected non-empty array of additional services", data)
                else:
                    self.log_test("Additional Pricing API", False, 
                                f"HTTP {response.status}: {await response.text()}")
        except Exception as e:
            self.log_test("Additional Pricing API", False, f"Request error: {str(e)}")
    
    async def test_coverage_api(self):
        """Test coverage areas API"""
        try:
            async with self.session.get(f"{BACKEND_URL}/coverage") as response:
                if response.status == 200:
                    data = await response.json()
                    required_fields = ["mobile_areas", "remote_areas", "travel_fees"]
                    
                    if all(field in data for field in required_fields):
                        mobile_count = len(data.get("mobile_areas", []))
                        remote_count = len(data.get("remote_areas", []))
                        self.log_test("Coverage Areas API", True, 
                                    f"Retrieved coverage - Mobile: {mobile_count} areas, Remote: {remote_count} areas", data)
                    else:
                        missing = [f for f in required_fields if f not in data]
                        self.log_test("Coverage Areas API", False, 
                                    f"Missing required fields: {missing}", data)
                else:
                    self.log_test("Coverage Areas API", False, 
                                f"HTTP {response.status}: {await response.text()}")
        except Exception as e:
            self.log_test("Coverage Areas API", False, f"Request error: {str(e)}")
    
    async def test_testimonials_api(self):
        """Test testimonials API"""
        try:
            async with self.session.get(f"{BACKEND_URL}/testimonials") as response:
                if response.status == 200:
                    data = await response.json()
                    
                    if isinstance(data, list) and len(data) > 0:
                        # Check first testimonial structure
                        testimonial = data[0]
                        required_fields = ["id", "name", "role", "content", "rating", "date", "verified", "active"]
                        
                        if all(field in testimonial for field in required_fields):
                            avg_rating = sum(t.get("rating", 0) for t in data) / len(data)
                            self.log_test("Testimonials API", True, 
                                        f"Retrieved {len(data)} testimonials, avg rating: {avg_rating:.1f}", data)
                        else:
                            missing = [f for f in required_fields if f not in testimonial]
                            self.log_test("Testimonials API", False, 
                                        f"Missing required fields: {missing}", data)
                    else:
                        self.log_test("Testimonials API", False, 
                                    "Expected non-empty array of testimonials", data)
                else:
                    self.log_test("Testimonials API", False, 
                                f"HTTP {response.status}: {await response.text()}")
        except Exception as e:
            self.log_test("Testimonials API", False, f"Request error: {str(e)}")
    
    async def test_contact_submissions_retrieval(self):
        """Test contact submissions retrieval (admin endpoint)"""
        try:
            async with self.session.get(f"{BACKEND_URL}/contact/submissions") as response:
                if response.status == 200:
                    data = await response.json()
                    
                    if isinstance(data, list):
                        self.log_test("Contact Submissions Retrieval", True, 
                                    f"Retrieved {len(data)} contact submissions", data)
                    else:
                        self.log_test("Contact Submissions Retrieval", False, 
                                    "Expected array of submissions", data)
                else:
                    self.log_test("Contact Submissions Retrieval", False, 
                                f"HTTP {response.status}: {await response.text()}")
        except Exception as e:
            self.log_test("Contact Submissions Retrieval", False, f"Request error: {str(e)}")
    
    async def test_nonexistent_endpoint(self):
        """Test error handling for nonexistent endpoint"""
        try:
            async with self.session.get(f"{BACKEND_URL}/nonexistent") as response:
                if response.status == 404:
                    self.log_test("Error Handling - 404", True, 
                                "Correctly returned 404 for nonexistent endpoint")
                else:
                    self.log_test("Error Handling - 404", False, 
                                f"Expected 404, got {response.status}")
        except Exception as e:
            self.log_test("Error Handling - 404", False, f"Request error: {str(e)}")
    
    async def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Comprehensive Backend API Testing")
        print("=" * 60)
        print()
        
        # Health check first
        await self.test_health_check()
        
        # Contact form tests (high priority)
        print("📝 CONTACT FORM API TESTS")
        print("-" * 30)
        await self.test_contact_form_valid_submission()
        await self.test_contact_form_invalid_email()
        await self.test_contact_form_missing_required_fields()
        await self.test_contact_form_invalid_service_type()
        await self.test_contact_form_edge_cases()
        await self.test_contact_submissions_retrieval()
        
        # Business data APIs
        print("🏢 BUSINESS DATA API TESTS")
        print("-" * 30)
        await self.test_business_info_api()
        await self.test_business_hours_api()
        await self.test_business_stats_api()
        await self.test_coverage_api()
        
        # Services and pricing
        print("💼 SERVICES & PRICING API TESTS")
        print("-" * 30)
        await self.test_services_api()
        await self.test_additional_pricing_api()
        
        # Testimonials
        print("⭐ TESTIMONIALS API TESTS")
        print("-" * 30)
        await self.test_testimonials_api()
        
        # Error handling
        print("🚨 ERROR HANDLING TESTS")
        print("-" * 30)
        await self.test_nonexistent_endpoint()
        
        # Summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t["success"]])
        failed_tests = len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        print()
        
        if self.failed_tests:
            print("🚨 FAILED TESTS:")
            print("-" * 20)
            for test in self.failed_tests:
                print(f"❌ {test['test']}")
                print(f"   Details: {test['details']}")
                print()
        
        print("=" * 60)

async def main():
    """Main test runner"""
    async with BackendTester() as tester:
        await tester.run_all_tests()

if __name__ == "__main__":
    asyncio.run(main())