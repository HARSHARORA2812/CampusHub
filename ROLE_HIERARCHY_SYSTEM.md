# 🔐 Role Hierarchy System - Complete Implementation

## Overview

CampusHub now has a comprehensive 5-tier role hierarchy system with proper permissions and promotion capabilities.

---

## 👥 User Roles (Top to Bottom)

### 1. 🔱 Main Admin
**Authority Level:** 5 (Highest)  
**Email:** officialharsharora2812@gmail.com  
**Password:** harsha  
**Name:** Harsha

**Capabilities:**
- ✅ Full system control across ALL colleges
- ✅ Can promote users to College Admin
- ✅ Can promote users to College Management
- ✅ Can promote users to Faculty
- ✅ View system-wide statistics
- ✅ Manage all colleges without restriction

**Scope:** Global (all colleges)

---

### 2. 👑 College Admin
**Authority Level:** 4

**Capabilities:**
- ✅ Full control over their specific college
- ✅ Can promote users to College Management (within their college)
- ✅ Can promote users to Faculty (within their college)
- ✅ Manage college clubs and events
- ✅ Manage college opportunities
- ✅ Manage college users
- ✅ Approve/reject club applications

**Scope:** College-specific (based on email domain)

**Promoted By:** Main Admin only

---

### 3. 🎯 College Management
**Authority Level:** 3

**Capabilities:**
- ✅ Create and manage opportunities for their college
- ✅ Can promote users to Faculty (within their college)
- ✅ View events, clubs, resources
- ✅ Approve club applications
- ✅ Share resources
- ✅ Use marketplace and lost & found

**Scope:** College-specific (based on email domain)

**Promoted By:** College Admin or Main Admin

---

### 4. 🎓 Faculty
**Authority Level:** 2

**Capabilities:**
- ✅ View events and register
- ✅ Join clubs
- ✅ Approve club applications
- ✅ View opportunities
- ✅ Share resources
- ✅ Use marketplace and lost & found

**Scope:** College-specific (based on email domain)

**Promoted By:** College Management, College Admin, or Main Admin

---

### 5. 📚 Student
**Authority Level:** 1 (Default)

**Capabilities:**
- ✅ View and register for events
- ✅ Join clubs
- ✅ View opportunities
- ✅ Share resources
- ✅ Use marketplace
- ✅ Use lost & found

**Scope:** College-specific (based on email domain)

**Default Role:** All new registrations

---

## 🔄 Promotion Hierarchy

```
Main Admin (Level 5)
    ↓ can promote to
    ├── College Admin (Level 4)
    ├── College Management (Level 3)
    ├── Faculty (Level 2)
    └── Student (Level 1)

College Admin (Level 4)
    ↓ can promote to
    ├── College Management (Level 3)
    ├── Faculty (Level 2)
    └── Student (Level 1)

College Management (Level 3)
    ↓ can promote to
    ├── Faculty (Level 2)
    └── Student (Level 1)

Faculty (Level 2)
    ↓ cannot promote

Student (Level 1)
    ↓ cannot promote
```

---

## 🏛️ College Identification

Each user is automatically assigned a **college_id** based on their email domain:

**Examples:**
- `john@stanford.edu` → college_id: `stanford`
- `jane@mit.edu` → college_id: `mit`
- `user@harvard.edu` → college_id: `harvard`

**Purpose:**
- College Admins can only manage users from their college
- College Management can only create opportunities for their college
- Data filtering is based on college affiliation

---

## 🔐 Permissions Matrix

| Feature | Student | Faculty | Management | College Admin | Main Admin |
|---------|---------|---------|------------|---------------|------------|
| **View Feed** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Events** | View/Register | View/Register | View/Register | Full Control | Full Control |
| **Clubs** | Join | Join/Approve | Join/Approve | Full Control | Full Control |
| **Create Opportunities** | ❌ | ❌ | ✅ | ✅ | ✅ |
| **View Opportunities** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Resources** | Share/View | Share/View | Share/View | Full Control | Full Control |
| **Marketplace** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Lost & Found** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Promote to Faculty** | ❌ | ❌ | ✅ | ✅ | ✅ |
| **Promote to Management** | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Promote to College Admin** | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Manage Any College** | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Admin Panel Access** | ❌ | ❌ | ✅ | ✅ | ✅ |

---

## 🚀 Getting Started

### Login as Main Admin

1. Go to http://localhost:5173/auth
2. Click "Login"
3. Enter credentials:
   - **Email:** officialharsharora2812@gmail.com
   - **Password:** harsha
4. You'll see "Main Administrator" role
5. Access "Admin Panel" from sidebar

### Promote a User

1. Login as Main Admin or College Admin
2. Navigate to "Admin Panel" (⚙️ icon in sidebar)
3. Find the user in the table
4. Click the "Promote to..." dropdown
5. Select target role
6. Confirm promotion

### Create an Opportunity (College Management or Higher)

1. Login as College Management, College Admin, or Main Admin
2. Navigate to "Opportunities"
3. You'll see a "+ Create Opportunity" button
4. Fill in the details
5. Submit - opportunity will be tagged with your college

---

## 🔧 Technical Implementation

### Backend

**New Files:**
- `backend/middleware/roleHierarchy.js` - Role hierarchy logic
- `backend/routes/admin.js` - Admin panel endpoints
- `backend/seedMainAdmin.js` - Main admin seeding script

**Updated Files:**
- `backend/models/User.js` - Added `college_id` field
- `backend/routes/auth.js` - Extract college_id on registration
- `backend/routes/opportunities.js` - Require college_management role
- `backend/server.js` - Added admin routes

**New Endpoints:**
```
GET  /api/admin/users - Get users (filtered by college for college admins)
POST /api/admin/users/:userId/promote - Promote user
POST /api/admin/users/:userId/demote - Demote user
GET  /api/admin/stats/college - Get college statistics
GET  /api/admin/my-permissions - Get current user's permissions
```

### Frontend

**New Files:**
- `frontend/src/pages/AdminPanel.jsx` - Admin panel UI

**Updated Files:**
- `frontend/src/pages/AuthPage.jsx` - Updated role select
- `frontend/src/components/layout/MainLayout.jsx` - Added admin panel link
- `frontend/src/App.jsx` - Added admin panel route

---

## 📊 Database Schema Updates

### User Model
```javascript
{
  role: {
    type: String,
    enum: ['student', 'faculty', 'college_management', 'college_admin', 'main_admin']
  },
  college_id: {
    type: String,  // e.g., 'stanford', 'mit', 'harvard'
    default: null
  }
}
```

---

## 🧪 Testing the System

### Test Scenario 1: Main Admin Powers
1. Login as main admin
2. Go to Admin Panel
3. See ALL users from ALL colleges
4. Promote any user to College Admin
5. Verify promotion works

### Test Scenario 2: College Admin Powers
1. Register with `admin@stanford.edu`
2. Login as main admin
3. Promote stanford user to College Admin
4. Logout and login as that user
5. Go to Admin Panel
6. See ONLY stanford users
7. Promote a stanford user to College Management
8. Verify cannot see users from other colleges

### Test Scenario 3: College Management Powers
1. Register with `manager@mit.edu`
2. Get promoted to College Management (by college admin or main admin)
3. Login as that user
4. Go to Opportunities
5. See "+ Create Opportunity" button
6. Create an opportunity
7. Verify it's tagged with MIT college

### Test Scenario 4: Student Restrictions
1. Register as student@harvard.edu
2. Login
3. Verify NO Admin Panel in sidebar
4. Verify NO Create Opportunity button
5. Can only view content from their college

---

## 🔒 Security Features

✅ **Role-based Access Control (RBAC)**
- Middleware checks role before allowing actions
- College-specific filtering for admins

✅ **College Isolation**
- College admins can only manage their college
- Data filtered by college_id automatically

✅ **Promotion Restrictions**
- Can only promote to roles you have authority for
- Cannot promote yourself
- Main admin required for college admin promotion

✅ **JWT Token Updates**
- Tokens include role and college_id
- Re-authentication required after role change

---

## 📈 Statistics & Monitoring

**Admin Panel Shows:**
- Total users (college-filtered for college admins)
- Student count
- Faculty count  
- Management count
- College admin count (main admin only)

---

## 🎯 Common Use Cases

### Use Case 1: New College Setup
1. Main admin logs in
2. Identifies a responsible faculty member
3. Promotes them to College Admin
4. College admin can now manage their college independently

### Use Case 2: Add Opportunity Poster
1. College admin logs in
2. Finds a faculty or student to handle opportunities
3. Promotes them to College Management
4. They can now post opportunities for students

### Use Case 3: Faculty Privileges
1. College management logs in
2. Finds a student who should have faculty access
3. Promotes them to Faculty
4. They can now approve clubs and access faculty features

---

## 🚨 Important Notes

⚠️ **Main Admin is Unique:**
- Only ONE main admin exists: officialharsharora2812@gmail.com
- Cannot be demoted
- Has universal access

⚠️ **College Admins are Powerful:**
- Have full control within their college
- Choose them carefully
- Can promote others to management

⚠️ **Email Domains Matter:**
- College identification is automatic from email
- Users from different colleges are isolated
- Main admin sees across all colleges

⚠️ **Role Changes Require Re-login:**
- After promotion, user should logout and login again
- Ensures fresh JWT token with new role

---

## 📝 Quick Reference

### Main Admin Credentials
```
Email: officialharsharora2812@gmail.com
Password: harsha
Name: Harsha
```

### Seed Main Admin (if needed)
```bash
cd backend
node seedMainAdmin.js
```

### Check User Roles
```bash
# MongoDB shell
db.users.find({}, {email: 1, role: 1, college_id: 1})
```

---

## ✅ Implementation Checklist

- ✅ 5-tier role hierarchy defined
- ✅ Main admin seeded in database
- ✅ Role promotion endpoints created
- ✅ Admin panel UI built
- ✅ College-based filtering implemented
- ✅ Opportunity creation restricted to management+
- ✅ Frontend updated with new roles
- ✅ Permission checks in middleware
- ✅ College ID auto-extraction from email
- ✅ Build passing (332.56 KB)

---

## 🎉 Status

**✅ FULLY IMPLEMENTED AND WORKING**

The hierarchical role system is now live with:
- Proper role levels and permissions
- College-based isolation
- Admin panel for user management
- Main admin with full system access
- Promotion capabilities based on authority

**Login and try it:** http://localhost:5173

Use the main admin credentials to promote users and test the hierarchy!
