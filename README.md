# Tender Management System

A full-featured **Tender Management System** built with **Angular (Frontend)** and **Spring Boot (Backend)**.  
This system allows users and admins to manage tenders, bids, work orders, payments, and reports efficiently.

---

## 🔹 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Frontend Routes](#frontend-routes)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## 🔹 Project Overview
- **Frontend:** Angular  
- **Backend:** Spring Boot  
- **Database:** MySQL / PostgreSQL (or any relational DB)  
- **Purpose:** Manage tenders, bidding, work orders, payments, and reporting in a secure and efficient way.  

---

## 🔹 Features
- Admin and User dashboards
- Tender creation and management
- Bidding and bid evaluation
- Work order and progress tracking
- Payment and wallet management
- Profile management
- Final reports generation

---

## 🔹 Frontend Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/home` | HomeComponent | Landing page |
| `/login` | LoginComponent | User login page |
| `/user-dashboard` | UserDashboardComponent | User dashboard |
| `/admin-dashboard` | AdminDashboardComponent | Admin dashboard |
| `/create-tender` | CreateTenderComponent | Create a new tender |
| `/tender-list` | TenderListComponent | List all tenders |
| `/bidding/:tenderId` | BiddingComponent | Bidding for a specific tender |
| `/sources` | SourceComponent | Manage sources |
| `/locations` | LocationComponent | Manage locations |
| `/categories` | CategoryComponent | Manage categories |
| `/admin-wallet` | AdminWalletComponent | Admin wallet overview |
| `/user-wallet` | UserWalletComponent | User wallet overview |
| `/payment` | PaymentComponent | General payment page |
| `/bid-evaluation` | BidEvaluationComponent | Evaluate bids |
| `/user-list` | UserListComponent | List of users |
| `/workorder/:bidId` | WorkOrderComponent | Work order details |
| `/work-pogress` | WorkPogressComponent | Track work progress |
| `/work-report` | WorkReportComponent | Generate work reports |
| `/payment-request` | PaymentRequestComponent | Payment requests |
| `/tender-payment/:tenderId` | TenderPaymentComponent | Tender payment page |
| `/work-payment` | WorkPaymentComponent | Work payment page |
| `/final-report` | FinalReportComponent | Final report generation |
| `/profile` | ProfileComponent | User profile management |
| `/awerd` | AwerdComponent | Award details |

---

