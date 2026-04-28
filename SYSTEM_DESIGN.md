# System Design: Digital Pathology Lab and Pharmacy Platform

## System Architecture

The proposed system adopts a modern, decoupled client-server architecture inspired by platforms like Tata 1mg, right-sized for a single lab setup with expandability in mind.

### Core Components
1. **Frontend (Client Applications):** Next.js (React) applications serving different user roles through role-specific dashboards.
2. **Backend API:** A unified RESTful API developed using FastAPI (Python) which acts as the core engine handling business logic, requests, and integration with third-party services.
3. **Database:** Supabase (PostgreSQL with NoSQL capabilities) or Firebase Firestore/MongoDB Atlas. Given the preference for NoSQL/Document styles, we will design around a NoSQL document database structure (e.g., MongoDB or Firebase Firestore). Let's go with Firebase Firestore/MongoDB structure for ease of scale.
4. **Cloud Storage:** AWS S3 or Supabase Storage for storing PDFs, prescriptions, and diagnostic images securely.
5. **Authentication Service:** OTP-based login system utilizing Firebase Auth, Twilio, or an SMS gateway (e.g., AWS SNS).
6. **Notification Engine:** Integrated with SMS (Twilio), WhatsApp Business API, and Push Notifications (FCM).

## Feature Modules

1. **Patient App Module:**
   - Account creation via OTP.
   - Test catalog browsing and booking.
   - Home sample collection requests and timeslot selection.
   - Medicine ordering with prescription upload.
   - Order tracking and report downloading.
   - Family profile management.

2. **Lab Management (Receptionist) Module:**
   - Patient registration and manual test booking.
   - Sample tracking (from collection to lab).
   - Technician assignment.
   - Report upload, entry, and automated delivery.
   - Pending report monitoring.

3. **Pharmacy Module:**
   - Medicine inventory and stock tracking with expiry alerts.
   - Prescription verification (Approve/Reject).
   - Medicine order processing and billing.
   - Delivery personnel assignment.

4. **Home Sample Collection (Phlebotomist) Module:**
   - Technician scheduling and route optimization.
   - Task acceptance/rejection dashboard.
   - Real-time navigation and patient notification triggers upon arrival.

5. **Delivery Management Module:**
   - Task list for medicine deliveries.
   - Delivery tracking and status updates.

6. **Admin (Super Admin) Module:**
   - Analytics (revenue, tests, medicine sales, performance).
   - User, Test, Medicine, Order, Technician, Delivery, and Report management.
   - System configuration and inventory monitoring.

7. **Report Management & Health Record System:**
   - PDF generation (branding, reference ranges, digital signature, QR code).
   - Long-term digital records with test history and visualization charts (e.g., Blood sugar over time).

## User Workflows

### 1. Home Sample Collection & Lab Test Workflow
1. **Patient** browses the catalog, adds tests, selects a home collection slot, and books the test.
2. **System** assigns a phlebotomist based on availability and location.
3. **Phlebotomist** receives the task, navigates to the patient, collects the sample, and updates status.
4. **Sample** arrives at the lab. Lab Receptionist scans the sample barcode and updates status to "Testing Begins".
5. **Lab Technician** conducts the test and uploads the results.
6. **System** generates a branded PDF report, signs it, and stores it in Cloud Storage.
7. **Patient** receives SMS/WhatsApp notification with a link to download the report.

### 2. Medicine Ordering Workflow
1. **Patient** searches for medicines, adds them to the cart, and uploads a prescription if required.
2. **Pharmacist** receives the order, verifies the prescription, and approves the order.
3. **Pharmacist** processes billing and assigns a Delivery Personnel.
4. **Delivery Personnel** picks up the medicine, navigates to the patient, and marks delivery as complete.

## Database Design

Assuming a NoSQL structure (e.g., MongoDB or Firebase Firestore):

### Collections

- **`Users`**: Standard auth info. `id`, `phone`, `role` (patient, admin, phlebotomist, pharmacist, etc.), `status`.
- **`Patients`**: `user_id`, `name`, `dob`, `gender`, `address`.
- **`FamilyProfiles`**: `patient_id` (owner), `name`, `relation`, `dob`, `gender`.
- **`Tests`**: Catalog of lab tests. `id`, `name`, `description`, `price`, `sample_type`, `reference_ranges`.
- **`Orders`**: Consolidates both lab and medicine orders or separated by type. `id`, `patient_id`, `order_type` (lab/medicine), `status`, `total_amount`, `created_at`.
- **`OrderItems`**: Items inside an order. `order_id`, `item_type` (test_id or medicine_id), `quantity`, `price`.
- **`Samples`**: `id`, `order_id`, `patient_id`, `phlebotomist_id`, `barcode`, `status` (collected, received, processing, completed).
- **`Reports`**: `id`, `order_id`, `patient_id`, `file_url`, `generated_at`, `status`.
- **`Medicines`**: `id`, `name`, `description`, `price`, `prescription_required`, `manufacturer`.
- **`Inventory`**: `medicine_id`, `batch_number`, `stock_quantity`, `expiry_date`.
- **`Prescriptions`**: `id`, `order_id`, `patient_id`, `file_url`, `status` (pending, verified, rejected).
- **`Technicians` / `Deliveries`**: Tasks for staff. `id`, `staff_id`, `order_id`, `status`, `assigned_at`, `completed_at`.

### Relationships
- **Users** is the root for authentication. One User to One Patient/Staff profile.
- **Patients** have One-to-Many relationship with **FamilyProfiles**, **Orders**, **Reports**, **Prescriptions**.
- **Orders** link to **OrderItems** (One-to-Many).
- **Samples** link tightly to Lab Orders and **Technicians**.

## API Structure

FastAPI will expose RESTful endpoints.

### Authentication
- `POST /api/auth/send-otp`
- `POST /api/auth/verify-otp` (Returns JWT)

### Patient / Catalog
- `GET /api/tests` (List tests)
- `GET /api/medicines` (List medicines)

### Booking & Ordering
- `POST /api/orders/lab` (Book lab test, optionally req home collection)
- `POST /api/orders/medicine` (Order medicine, upload prescription)
- `GET /api/orders/{order_id}` (Track status)

### Reports & Records
- `POST /api/reports/upload` (Lab tech uploads results)
- `GET /api/reports/patient/{patient_id}` (Get patient history)
- `GET /api/reports/download/{report_id}` (Get signed S3/Cloud Storage link)

### Staff Assignment
- `POST /api/technicians/assign` (Assign phlebotomist to sample)
- `PUT /api/technicians/status/{task_id}` (Update task status)
- `PUT /api/delivery/status/{delivery_id}`

### Admin & Pharmacy
- `GET /api/admin/analytics/revenue`
- `POST /api/inventory/update`
- `PUT /api/prescriptions/{id}/verify`

## UI Layout

### Patient App (Mobile-First Web App)
- **Home:** Search bar (Tests/Medicines), popular health checkups, past reports widget.
- **Cart & Checkout:** Selected tests/medicines, slot selection for collection, address, prescription upload, payment gateway.
- **Records:** Timeline of lab reports, health trends (charts for vitals), family member selector.
- **Tracking:** Live status of sample collection or medicine delivery.

### Lab Dashboard (Desktop)
- **Home/Pending:** Queue of incoming samples, assigned technicians.
- **Report Entry:** Forms for manual result entry against tests, or bulk PDF upload interface.
- **Patients:** Registration form, walk-in billing.

### Pharmacy Dashboard (Desktop/Tablet)
- **Orders:** Queue of medicine orders. Split view for prescription verification.
- **Inventory:** Table of stock, highlighted rows for low stock / near expiry.
- **Dispatch:** Assigning orders to delivery personnel.

### Technician/Delivery Dashboard (Mobile PWA)
- **Task List:** Assigned tasks with map integration for route optimization.
- **Active Task:** Patient details, "Mark Arrived", "Scan Sample Barcode", "Mark Collected/Delivered".

### Admin Panel (Desktop)
- **Overview:** High-level metrics (Daily Revenue, Test Volume, Active Users).
- **Management Tabs:** Users, Catalog (Tests/Medicines), Orders, Staff.
- **Reports:** Exportable CSVs for performance and financial audits.

## Backend Implementation Plan

### Folder Structure (FastAPI)
\`\`\`
backend/
├── app/
│   ├── main.py              # Application entry point
│   ├── core/                # Config, security, exceptions
│   ├── api/                 # API routers
│   │   ├── routes/          # e.g., auth.py, orders.py, reports.py
│   ├── controllers/         # Business logic separate from routing
│   ├── models/              # Pydantic models (Schemas) & DB models
│   ├── services/            # Third-party integrations (S3, SMS, PDF Gen)
│   ├── utils/               # Helpers (QR gen, formatting)
│   └── dependencies.py      # DB injection, Auth verification
├── requirements.txt
├── Dockerfile
└── .env
\`\`\`

### Frontend Implementation Plan (Next.js)
\`\`\`
frontend/
├── src/
│   ├── app/                 # Next.js 13+ App Router pages (patient, admin, lab)
│   ├── components/          # Reusable UI (Buttons, Cards, Modals)
│   ├── features/            # Feature specific components (e.g., Checkout, ReportViewer)
│   ├── lib/                 # API clients, hooks, utility functions
│   ├── store/               # State management (Zustand/Redux)
│   └── styles/              # Global styles, Tailwind config
├── package.json
└── Dockerfile
\`\`\`

## Deployment Architecture

1. **Containers:** Both Next.js frontend and FastAPI backend are containerized using Docker.
2. **Hosting:**
   - **Backend:** Deployed on AWS ECS / Google Cloud Run / DigitalOcean App Platform for auto-scaling stateless containers.
   - **Frontend:** Deployed on Vercel or AWS Amplify for edge delivery and optimized Next.js performance.
3. **Database:** Fully managed NoSQL DB (e.g., MongoDB Atlas or Firebase Firestore).
4. **Storage & CDN:** AWS S3 for storing PDFs/images, with AWS CloudFront (CDN) to securely and quickly serve reports.
5. **Environment:** Staging and Production environments configured via secure environment variables (`.env`). CI/CD pipeline using GitHub Actions to automatically build and push Docker images.

## Scaling Strategy

To evolve into a multi-lab marketplace platform (like Tata 1mg):

1. **Multi-Tenant Architecture:**
   - Update the database schema to include `lab_id` and `pharmacy_id` on Tests, Medicines, Orders, and Staff.
   - Implement strict Row-Level Security (RLS) or application-level data isolation so each lab only sees its data.
2. **Lab Onboarding System:**
   - Build an automated onboarding portal for third-party labs to register, upload their test catalog/pricing, and map their coverage areas via geofencing.
3. **Regional Scaling & Marketplace Routing:**
   - Introduce a geospatial query layer to route patient searches to the nearest partnered labs.
   - Implement read replicas for the database in different geographical regions to maintain low latency.
   - Scale the backend APIs horizontally using load balancers.
4. **Advanced Logistics:**
   - Transition from simple technician assignment to an Uber-like gig-worker model for phlebotomists and delivery riders, managed via a dedicated logistics microservice.
