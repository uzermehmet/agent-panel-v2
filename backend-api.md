# Visa Application Management System - Backend API Documentation

## Introduction

This document outlines the RESTful API endpoints for the Visa Application Management System backend. It serves as a guide for developing the backend application, covering authentication, user management, application management, customer management, and staff management.

## Base URL

`[Your Backend Base URL Here]` (e.g., `http://localhost:3000/api/v1`)

## Authentication

### 1. User Login

*   **Endpoint:** `/auth/login`
*   **Method:** `POST`
*   **Description:** Authenticates a user and returns a JWT token.
*   **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
*   **Response (Success - 200 OK):**
    ```json
    {
      "token": "string",
      "user": {
        "id": "string",
        "name": "string",
        "email": "string",
        "role": "agency_manager" | "expert_user" | "standard_user",
        "permissions": ["string"],
        "assignedCountries": ["string"] | null
      }
    }
    ```
*   **Response (Error - 401 Unauthorized):**
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

### 2. Get Authenticated User

*   **Endpoint:** `/auth/me`
*   **Method:** `GET`
*   **Description:** Retrieves the details of the currently authenticated user. Requires a valid JWT token in the `Authorization` header (`Bearer <token>`).
*   **Request Headers:**
    ```
    Authorization: Bearer <token>
    ```
*   **Response (Success - 200 OK):**
    ```json
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "agency_manager" | "expert_user" | "standard_user",
      "permissions": ["string"],
      "assignedCountries": ["string"] | null
    }
    ```
*   **Response (Error - 401 Unauthorized):**
    ```json
    {
      "message": "Unauthorized"
    }
    ```

## Users (Staff)

*   **Permissions Required:** `manage_staff` (for agency_manager)

### 1. Get All Staff Members

*   **Endpoint:** `/staff`
*   **Method:** `GET`
*   **Description:** Retrieves a list of all staff members.
*   **Query Parameters:**
    *   `search`: Optional. Filter by name or email.
    *   `role`: Optional. Filter by role (`agency_manager`, `expert_user`, `standard_user`).
    *   `page`: Optional. Page number for pagination (default: 1).
    *   `limit`: Optional. Number of items per page (default: 10).
*   **Response (Success - 200 OK):**
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "email": "string",
        "role": "agency_manager" | "expert_user" | "standard_user",
        "assignedCountries": ["string"] | null,
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
      // ... more staff members
    ]
    ```

### 2. Get Staff Member by ID

*   **Endpoint:** `/staff/:id`
*   **Method:** `GET`
*   **Description:** Retrieves details of a specific staff member.
*   **URL Parameters:**
    *   `id`: The ID of the staff member.
*   **Response (Success - 200 OK):**
    ```json
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "agency_manager" | "expert_user" | "standard_user",
      "assignedCountries": ["string"] | null,
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Staff member not found"
    }
    ```

### 3. Create New Staff Member

*   **Endpoint:** `/staff`
*   **Method:** `POST`
*   **Description:** Creates a new staff member.
*   **Request Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string",
      "role": "agency_manager" | "expert_user" | "standard_user",
      "assignedCountries": ["string"] | null
    }
    ```
*   **Response (Success - 201 Created):**
    ```json
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "agency_manager" | "expert_user" | "standard_user",
      "assignedCountries": ["string"] | null,
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "Validation error details"
    }
    ```

### 4. Update Staff Member

*   **Endpoint:** `/staff/:id`
*   **Method:** `PUT`
*   **Description:** Updates an existing staff member's details.
*   **URL Parameters:**
    *   `id`: The ID of the staff member.
*   **Request Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string" | null, // Optional, only if changing password
      "role": "agency_manager" | "expert_user" | "standard_user",
      "assignedCountries": ["string"] | null
    }
    ```
*   **Response (Success - 200 OK):**
    ```json
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "agency_manager" | "expert_user" | "standard_user",
      "assignedCountries": ["string"] | null,
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "Validation error details"
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Staff member not found"
    }
    ```

### 5. Delete Staff Member

*   **Endpoint:** `/staff/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a staff member.
*   **URL Parameters:**
    *   `id`: The ID of the staff member.
*   **Response (Success - 204 No Content):**
    *   No response body.
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Staff member not found"
    }
    ```

## Customers

*   **Permissions Required:** `manage_customers` or `view_customers` (depending on operation)

### 1. Get All Customers

*   **Endpoint:** `/customers`
*   **Method:** `GET`
*   **Description:** Retrieves a list of all customers.
*   **Query Parameters:**
    *   `search`: Optional. Filter by name, email, or phone.
    *   `assignedTo`: Optional. Filter by assigned staff member ID.
    *   `hasActiveApplication`: Optional. Filter by customers with active applications (`true` or `false`).
    *   `lastActivityAfter`: Optional. Filter by last activity date (ISO 8601 format).
    *   `page`: Optional. Page number for pagination (default: 1).
    *   `limit`: Optional. Number of items per page (default: 10).
*   **Response (Success - 200 OK):**
    ```json
    [
      {
        "id": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "phone": "string",
        "applicationCount": "number",
        "lastApplicationDate": "datetime" | null,
        "assignedTo": {
           "id": "string",
           "name": "string"
        } | null,
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
      // ... more customers
    ]
    ```

### 2. Get Customer by ID

*   **Endpoint:** `/customers/:id`
*   **Method:** `GET`
*   **Description:** Retrieves details of a specific customer.
*   **URL Parameters:**
    *   `id`: The ID of the customer.
*   **Response (Success - 200 OK):**
    ```json
    {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "applicationCount": "number",
      "lastApplicationDate": "datetime" | null,
      "assignedTo": {
         "id": "string",
         "name": "string"
      } | null,
      "createdAt": "datetime",
      "updatedAt": "datetime",
      "applications": [ // List of applications associated with this customer
        {
          "id": "string",
          "status": "string",
          "country": "string",
          "purpose": "string",
          "createdAt": "datetime"
        }
        // ... more applications
      ]
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Customer not found"
    }
    ```

### 3. Create New Customer

*   **Endpoint:** `/customers`
*   **Method:** `POST`
*   **Description:** Creates a new customer.
*   **Request Body:**
    ```json
    {
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "assignedToId": "string" | null // Optional: ID of the assigned staff member
    }
    ```
*   **Response (Success - 201 Created):**
    ```json
    {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "applicationCount": 0,
      "lastApplicationDate": null,
      "assignedTo": {
         "id": "string",
         "name": "string"
      } | null,
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "Validation error details"
    }
    ```

### 4. Update Customer

*   **Endpoint:** `/customers/:id`
*   **Method:** `PUT`
*   **Description:** Updates an existing customer's details.
*   **URL Parameters:**
    *   `id`: The ID of the customer.
*   **Request Body:**
    ```json
    {
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "assignedToId": "string" | null // Optional: ID of the assigned staff member
    }
    ```
*   **Response (Success - 200 OK):**
    ```json
    {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "applicationCount": "number",
      "lastApplicationDate": "datetime" | null,
      "assignedTo": {
         "id": "string",
         "name": "string"
      } | null,
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "Validation error details"
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Customer not found"
    }
    ```

### 5. Delete Customer

*   **Endpoint:** `/customers/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a customer.
*   **URL Parameters:**
    *   `id`: The ID of the customer.
*   **Response (Success - 204 No Content):**
    *   No response body.
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Customer not found"
    }
    ```

## Applications

*   **Permissions Required:** `manage_applications` or `view_applications` (depending on operation)

### 1. Get All Applications

*   **Endpoint:** `/applications`
*   **Method:** `GET`
*   **Description:** Retrieves a list of all visa applications.
*   **Query Parameters:**
    *   `search`: Optional. Filter by application ID, customer name, or country.
    *   `status`: Optional. Filter by status (`approved`, `pending`, `processing`, `rejected`).
    *   `country`: Optional. Filter by country.
    *   `consultantId`: Optional. Filter by assigned consultant ID.
    *   `startDate`: Optional. Filter by creation date after this date (ISO 8601 format).
    *   `endDate`: Optional. Filter by creation date before this date (ISO 8601 format).
    *   `page`: Optional. Page number for pagination (default: 1).
    *   `limit`: Optional. Number of items per page (default: 10).
*   **Response (Success - 200 OK):**
    ```json
    [
      {
        "id": "string",
        "status": "string",
        "customer": {
          "id": "string",
          "name": "string"
        },
        "country": "string",
        "purpose": "string",
        "createdAt": "datetime",
        "travelDates": "string", // e.g., "YYYY-MM-DD - YYYY-MM-DD"
        "consultant": {
           "id": "string",
           "name": "string"
        } | null,
        "documentsStatus": "completed" | "missing" | "N/A", // Simplified status
        "appointmentDate": "date" | null // Simplified date
      }
      // ... more applications
    ]
    ```

### 2. Get Application by ID

*   **Endpoint:** `/applications/:id`
*   **Method:** `GET`
*   **Description:** Retrieves details of a specific visa application.
*   **URL Parameters:**
    *   `id`: The ID of the application.
*   **Response (Success - 200 OK):**
    ```json
    {
      "id": "string",
      "status": "string",
      "customer": {
        "id": "string",
        "name": "string"
      },
      "country": "string",
      "purpose": "string",
      "createdAt": "datetime",
      "visaType": "string",
      "entryType": "string",
      "travelDates": "string", // e.g., "YYYY-MM-DD - YYYY-MM-DD"
      "participants": [
        {
          "id": "string",
          "firstName": "string",
          "lastName": "string",
          "relationship": "string",
          "passportNumber": "string"
        }
        // ... more participants
      ],
      "consultant": {
        "id": "string",
        "name": "string",
        "email": "string",
        "phone": "string"
      } | null,
      "documents": [
        {
          "id": "string",
          "name": "string",
          "type": "string",
          "required": "boolean",
          "participant": "string", // Participant ID or "main"
          "status": "string", // e.g., "uploaded", "missing", "approved", "rejected"
          "uploadedBy": "string" | null, // User ID
          "uploadedAt": "datetime" | null,
          "dueDate": "date",
          "version": "number",
          "notes": "string",
          "history": [
            {
              "action": "string",
              "user": "string", // User ID
              "date": "datetime",
              "reason": "string" | null
            }
            // ... more history entries
          ]
        }
        // ... more documents
      ],
      "appointment": {
        "date": "date",
        "time": "string", // e.g., "HH:mm"
        "location": "string",
        "status": "string" // e.g., "scheduled", "completed", "cancelled"
      } | null,
      "notes": [
        {
          "id": "string",
          "text": "string",
          "user": "string", // User ID
          "date": "datetime"
        }
        // ... more notes
      ],
      "history": [
        {
          "id": "string",
          "action": "string",
          "user": "string", // User ID
          "date": "datetime",
          "application": "string" // Application ID
        }
        // ... more history entries
      ],
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application not found"
    }
    ```

### 3. Create New Application

*   **Endpoint:** `/applications`
*   **Method:** `POST`
*   **Description:** Creates a new visa application.
*   **Request Body:**
    ```json
    {
      "customerId": "string",
      "country": "string",
      "purpose": "string",
      "visaType": "string",
      "entryType": "string",
      "travelDates": "string", // e.g., "YYYY-MM-DD - YYYY-MM-DD"
      "participants": [
        {
          "firstName": "string",
          "lastName": "string",
          "relationship": "string",
          "passportNumber": "string"
        }
        // ... more participants
      ],
      "consultantId": "string" | null // Optional: ID of the assigned consultant
      // Initial documents, appointment, notes can be added here or via separate endpoints
    }
    ```
*   **Response (Success - 201 Created):**
    ```json
    {
      "id": "string",
      "status": "pending", // Default status
      "customer": { ... }, // Customer details
      "country": "string",
      "purpose": "string",
      "createdAt": "datetime",
      "visaType": "string",
      "entryType": "string",
      "travelDates": "string",
      "participants": [ ... ],
      "consultant": { ... } | null,
      "documents": [], // Initially empty or default required docs
      "appointment": null,
      "notes": [],
      "history": [ ... ], // Initial history entry
      "updatedAt": "datetime"
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "Validation error details"
    }
    ```

### 4. Update Application

*   **Endpoint:** `/applications/:id`
*   **Method:** `PUT`
*   **Description:** Updates an existing visa application's details.
*   **URL Parameters:**
    *   `id`: The ID of the application.
*   **Request Body:**
    ```json
    {
      "status": "string", // e.g., "approved", "pending", "processing", "rejected"
      "country": "string",
      "purpose": "string",
      "visaType": "string",
      "entryType": "string",
      "travelDates": "string",
      "consultantId": "string" | null // Optional: ID of the assigned consultant
      // Participants, documents, appointment, notes should be updated via separate endpoints
    }
    ```
*   **Response (Success - 200 OK):**
    ```json
    {
      "id": "string",
      "status": "string",
      "customer": { ... },
      "country": "string",
      "purpose": "string",
      "createdAt": "datetime",
      "visaType": "string",
      "entryType": "string",
      "travelDates": "string",
      "participants": [ ... ], // Note: Participants are not updated here
      "consultant": { ... } | null,
      "documents": [ ... ], // Note: Documents are not updated here
      "appointment": { ... } | null, // Note: Appointment is not updated here
      "notes": [ ... ], // Note: Notes are not updated here
      "history": [ ... ], // Note: History is not updated here
      "updatedAt": "datetime"
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "Validation error details"
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application not found"
    }
    ```

### 5. Delete Application

*   **Endpoint:** `/applications/:id`
*   **Method:** `DELETE`
*   **Description:** Deletes a visa application.
*   **URL Parameters:**
    *   `id`: The ID of the application.
*   **Response (Success - 204 No Content):**
    *   No response body.
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application not found"
    }
    ```

## Application Participants

*   **Permissions Required:** `manage_applications`

### 1. Add Participant to Application

*   **Endpoint:** `/applications/:applicationId/participants`
*   **Method:** `POST`
*   **Description:** Adds a new participant to an application.
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
*   **Request Body:**
    ```json
    {
      "firstName": "string",
      "lastName": "string",
      "relationship": "string",
      "passportNumber": "string"
    }
    ```
*   **Response (Success - 201 Created):**
    ```json
    {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "relationship": "string",
      "passportNumber": "string"
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "Validation error details"
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application not found"
    }
    ```

### 2. Update Participant in Application

*   **Endpoint:** `/applications/:applicationId/participants/:participantId`
*   **Method:** `PUT`
*   **Description:** Updates a participant's details in an application.
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
    *   `participantId`: The ID of the participant.
*   **Request Body:**
    ```json
    {
      "firstName": "string",
      "lastName": "string",
      "relationship": "string",
      "passportNumber": "string"
    }
    ```
*   **Response (Success - 200 OK):**
    ```json
    {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "relationship": "string",
      "passportNumber": "string"
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "Validation error details"
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application or participant not found"
    }
    ```

### 3. Remove Participant from Application

*   **Endpoint:** `/applications/:applicationId/participants/:participantId`
*   **Method:** `DELETE`
*   **Description:** Removes a participant from an application.
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
    *   `participantId`: The ID of the participant.
*   **Response (Success - 204 No Content):**
    *   No response body.
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application or participant not found"
    }
    ```

## Application Documents

*   **Permissions Required:** `manage_applications`

### 1. Get Documents for Application

*   **Endpoint:** `/applications/:applicationId/documents`
*   **Method:** `GET`
*   **Description:** Retrieves the list of documents for a specific application.
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
*   **Response (Success - 200 OK):**
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "required": "boolean",
        "participant": "string", // Participant ID or "main"
        "status": "string", // e.g., "uploaded", "missing", "approved", "rejected"
        "uploadedBy": "string" | null, // User ID
        "uploadedAt": "datetime" | null,
        "dueDate": "date",
        "version": "number",
        "notes": "string",
        "history": [ ... ] // Document history
      }
      // ... more documents
    ]
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application not found"
    }
    ```

### 2. Add Document to Application

*   **Endpoint:** `/applications/:applicationId/documents`
*   **Method:** `POST`
*   **Description:** Adds a new document requirement to an application. (This is for defining *which* document is needed, not uploading the file itself).
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
*   **Request Body:**
    ```json
    {
      "name": "string",
      "type": "string",
      "required": "boolean",
      "participant": "string", // Participant ID or "main"
      "dueDate": "date",
      "notes": "string" | null
    }
    ```
*   **Response (Success - 201 Created):**
    ```json
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "required": "boolean",
      "participant": "string",
      "status": "missing", // Default status
      "uploadedBy": null,
      "uploadedAt": null,
      "dueDate": "date",
      "version": 0,
      "notes": "string" | null,
      "history": [ ... ] // Initial history entry
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "Validation error details"
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application not found"
    }
    ```

### 3. Update Document Details

*   **Endpoint:** `/applications/:applicationId/documents/:documentId`
*   **Method:** `PUT`
*   **Description:** Updates details of a document requirement (e.g., due date, notes, status).
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
    *   `documentId`: The ID of the document.
*   **Request Body:**
    ```json
    {
      "name": "string", // Optional
      "type": "string", // Optional
      "required": "boolean", // Optional
      "participant": "string", // Optional
      "status": "string", // Optional (e.g., "uploaded", "missing", "approved", "rejected")
      "dueDate": "date", // Optional
      "notes": "string" | null // Optional
    }
    ```
*   **Response (Success - 200 OK):**
    ```json
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "required": "boolean",
      "participant": "string",
      "status": "string",
      "uploadedBy": "string" | null,
      "uploadedAt": "datetime" | null,
      "dueDate": "date",
      "version": "number",
      "notes": "string" | null,
      "history": [ ... ] // Updated history
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "Validation error details"
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application or document not found"
    }
    ```

### 4. Upload Document File

*   **Endpoint:** `/applications/:applicationId/documents/:documentId/upload`
*   **Method:** `POST`
*   **Description:** Uploads a file for a specific document requirement.
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
    *   `documentId`: The ID of the document.
*   **Request Body:** `multipart/form-data` with a file field (e.g., `file`).
*   **Response (Success - 200 OK):**
    ```json
    {
      "id": "string",
      "name": "string",
      "type": "string",
      "required": "boolean",
      "participant": "string",
      "status": "uploaded", // Status updated automatically
      "uploadedBy": "string", // User ID
      "uploadedAt": "datetime",
      "dueDate": "date",
      "version": "number", // Version incremented
      "notes": "string" | null,
      "history": [ ... ] // History updated
      // Add file metadata if needed, e.g., "fileUrl": "string"
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "Validation error details"
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application or document not found"
    }
    ```

### 5. Download Document File

*   **Endpoint:** `/applications/:applicationId/documents/:documentId/download`
*   **Method:** `GET`
*   **Description:** Downloads the latest version of the document file.
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
    *   `documentId`: The ID of the document.
*   **Response (Success - 200 OK):**
    *   File content. `Content-Type` header should match the file type.
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application or document file not found"
    }
    ```

### 6. Delete Document Requirement

*   **Endpoint:** `/applications/:applicationId/documents/:documentId`
*   **Method:** `DELETE`
*   **Description:** Deletes a document requirement and its associated files.
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
    *   `documentId`: The ID of the document.
*   **Response (Success - 204 No Content):**
    *   No response body.
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application or document not found"
    }
    ```

## Application Appointments

*   **Permissions Required:** `manage_applications`

### 1. Get Appointment for Application

*   **Endpoint:** `/applications/:applicationId/appointment`
*   **Method:** `GET`
*   **Description:** Retrieves the appointment details for a specific application.
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
*   **Response (Success - 200 OK):**
    ```json
    {
      "date": "date",
      "time": "string", // e.g., "HH:mm"
      "location": "string",
      "status": "string" // e.g., "scheduled", "completed", "cancelled"
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application or appointment not found"
    }
    ```

### 2. Create or Update Appointment for Application

*   **Endpoint:** `/applications/:applicationId/appointment`
*   **Method:** `PUT` (or `POST` if creating, `PUT` if updating - `PUT` is simpler for a single appointment per application)
*   **Description:** Creates or updates the appointment details for an application.
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
*   **Request Body:**
    ```json
    {
      "date": "date",
      "time": "string",
      "location": "string",
      "status": "string" // e.g., "scheduled", "completed", "cancelled"
    }
    ```
*   **Response (Success - 200 OK):**
    ```json
    {
      "date": "date",
      "time": "string",
      "location": "string",
      "status": "string"
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "Validation error details"
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application not found"
    }
    ```

### 3. Delete Appointment for Application

*   **Endpoint:** `/applications/:applicationId/appointment`
*   **Method:** `DELETE`
*   **Description:** Deletes the appointment for an application.
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
*   **Response (Success - 204 No Content):**
    *   No response body.
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application or appointment not found"
    }
    ```

## Application Notes

*   **Permissions Required:** `manage_applications` or `view_applications`

### 1. Get Notes for Application

*   **Endpoint:** `/applications/:applicationId/notes`
*   **Method:** `GET`
*   **Description:** Retrieves the list of notes for a specific application.
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
*   **Response (Success - 200 OK):**
    ```json
    [
      {
        "id": "string",
        "text": "string",
        "user": {
           "id": "string",
           "name": "string"
        },
        "date": "datetime"
      }
      // ... more notes
    ]
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application not found"
    }
    ```

### 2. Add Note to Application

*   **Endpoint:** `/applications/:applicationId/notes`
*   **Method:** `POST`
*   **Description:** Adds a new note to an application.
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
*   **Request Body:**
    ```json
    {
      "text": "string"
    }
    ```
*   **Response (Success - 201 Created):**
    ```json
    {
      "id": "string",
      "text": "string",
      "user": {
         "id": "string",
         "name": "string"
      }, // User who created the note
      "date": "datetime"
    }
    ```
*   **Response (Error - 400 Bad Request):**
    ```json
    {
      "message": "Validation error details"
    }
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application not found"
    }
    ```

### 3. Delete Note from Application

*   **Endpoint:** `/applications/:applicationId/notes/:noteId`
*   **Method:** `DELETE`
*   **Description:** Deletes a specific note from an application.
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
    *   `noteId`: The ID of the note.
*   **Response (Success - 204 No Content):**
    *   No response body.
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application or note not found"
    }
    ```

## Application History

*   **Permissions Required:** `view_applications`

### 1. Get History for Application

*   **Endpoint:** `/applications/:applicationId/history`
*   **Method:** `GET`
*   **Description:** Retrieves the history log for a specific application.
*   **URL Parameters:**
    *   `applicationId`: The ID of the application.
*   **Response (Success - 200 OK):**
    ```json
    [
      {
        "id": "string",
        "action": "string", // e.g., "Application Created", "Status Updated", "Document Uploaded"
        "user": {
           "id": "string",
           "name": "string"
        }, // User who performed the action
        "date": "datetime",
        "details": "string" | null // Optional details about the action
      }
      // ... more history entries
    ]
    ```
*   **Response (Error - 404 Not Found):**
    ```json
    {
      "message": "Application not found"
    }
    ```

## Reports (Placeholder)

*   **Permissions Required:** `view_reports`

### 1. Get Application Summary Report

*   **Endpoint:** `/reports/application-summary`
*   **Method:** `GET`
*   **Description:** Retrieves a summary report of applications (e.g., counts by status, country, consultant).
*   **Query Parameters:**
    *   `startDate`: Optional. Filter by creation date after this date (ISO 8601 format).
    *   `endDate`: Optional. Filter by creation date before this date (ISO 8601 format).
    *   `country`: Optional. Filter by country.
    *   `consultantId`: Optional. Filter by assigned consultant ID.
*   **Response (Success - 200 OK):**
    ```json
    {
      "totalApplications": "number",
      "statusCounts": {
        "approved": "number",
        "pending": "number",
        "processing": "number",
        "rejected": "number"
        // ... other statuses
      },
      "countryCounts": {
        "USA": "number",
        "France": "number"
        // ... other countries
      },
      "consultantCounts": {
        "consultantId1": "number",
        "consultantId2": "number"
        // ... other consultants
      }
      // ... other summary data
    }
    ```

### 2. Get Staff Performance Report

*   **Endpoint:** `/reports/staff-performance`
*   **Method:** `GET`
*   **Description:** Retrieves a report on staff performance (e.g., number of applications managed, average processing time).
*   **Query Parameters:**
    *   `startDate`: Optional. Filter by application creation date after this date (ISO 8601 format).
    *   `endDate`: Optional. Filter by application creation date before this date (ISO 8601 format).
    *   `staffId`: Optional. Filter for a specific staff member.
*   **Response (Success - 200 OK):**
    ```json
    [
      {
        "staff": {
          "id": "string",
          "name": "string"
        },
        "applicationsManaged": "number",
        "approvedCount": "number",
        "rejectedCount": "number",
        "averageProcessingTimeDays": "number" | null
        // ... other performance metrics
      }
      // ... more staff performance data
    ]
    ```

## Error Handling

*   **400 Bad Request:** Invalid input data (validation errors). Response body contains details.
*   **401 Unauthorized:** Authentication failed (invalid or missing token).
*   **403 Forbidden:** User does not have the necessary permissions.
*   **404 Not Found:** Resource not found.
*   **500 Internal Server Error:** Unexpected server error.

## Data Types

*   `string`: Text value.
*   `number`: Numeric value (integer or float).
*   `boolean`: True or false.
*   `date`: Date in YYYY-MM-DD format.
*   `datetime`: Timestamp in ISO 8601 format (e.g., YYYY-MM-DDTHH:mm:ssZ).
*   `array`: List of items.
*   `object`: Key-value pair structure.
*   `null`: Absence of a value.

---
