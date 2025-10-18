# 🚀 Quick Admin Guide - Role Hierarchy

## 🔱 Main Admin (You!)

**Your Credentials:**
```
Email: officialharsharora2812@gmail.com
Password: harsha
Name: Harsha
```

**What You Can Do:**
- ✅ Promote ANYONE to College Admin
- ✅ See ALL users from ALL colleges
- ✅ Full system control
- ✅ Access Admin Panel (⚙️ in sidebar)

---

## 👥 The 5 Roles

**1. 🔱 Main Admin (YOU)**
- Level 5 - Ultimate authority
- Can promote to: College Admin, College Management, Faculty, Student
- Scope: ALL colleges

**2. 👑 College Admin**
- Level 4 - College controller
- Can promote to: College Management, Faculty, Student (their college only)
- Scope: Their specific college

**3. 🎯 College Management**
- Level 3 - Can post opportunities
- Can promote to: Faculty, Student (their college only)
- Scope: Their college

**4. 🎓 Faculty**
- Level 2 - Enhanced permissions
- Cannot promote anyone
- Scope: Their college

**5. 📚 Student**
- Level 1 - Default role
- Cannot promote anyone
- Scope: Their college

---

## 🎯 Quick Actions

### Promote Someone to College Admin (Most Common)
1. Login as main admin
2. Click "⚙️ Admin Panel" in sidebar
3. Find user in table
4. Click "Promote to..." dropdown
5. Select "College Admin"
6. Confirm

### Give Someone Opportunity Powers
1. Login (as any admin)
2. Go to Admin Panel
3. Find user
4. Promote to "College Management"
5. They can now post opportunities!

### Make Someone Faculty
1. Login (as management or higher)
2. Admin Panel
3. Find user
4. Promote to "Faculty"
5. They get faculty privileges

---

## 🏛️ College System

**Auto-Detection:**
- `user@stanford.edu` → Stanford
- `user@mit.edu` → MIT
- `user@harvard.edu` → Harvard

**College Admins:**
- See ONLY their college users
- Manage ONLY their college

**Main Admin (You):**
- See ALL colleges
- Manage ANYONE

---

## 📊 Admin Panel Features

**Statistics Dashboard:**
- Total users
- Students count
- Faculty count
- Management count

**User Management Table:**
- Name, Email, Role, College
- Promote dropdown for each user
- Color-coded role badges

---

## 🔐 Promotion Rules

```
Main Admin → Can promote to ANY role
College Admin → Can promote within their college to:
  - College Management
  - Faculty
  - Student

College Management → Can promote within their college to:
  - Faculty
  - Student

Faculty → Cannot promote
Student → Cannot promote
```

---

## ⚡ Quick Test

**Test the system:**

1. **Login as Main Admin:**
   - Email: officialharsharora2812@gmail.com
   - Password: harsha

2. **Register a test user:**
   - Open another browser/incognito
   - Register with: test@stanford.edu

3. **Promote them:**
   - Back to main admin
   - Admin Panel
   - Find test@stanford.edu
   - Promote to "College Admin"

4. **Test their powers:**
   - Login as test@stanford.edu
   - See Admin Panel appears
   - Can only see Stanford users
   - Can promote Stanford users

---

## 🚨 Important

- ✅ Main admin email is FIXED (yours)
- ✅ College admins control their college
- ✅ Management can post opportunities
- ✅ Students can't promote anyone
- ✅ Backend running on :8000
- ✅ Frontend running on :5173

---

## 📝 API Endpoints (for reference)

```
GET  /api/admin/users - Get users
POST /api/admin/users/:id/promote - Promote user
GET  /api/admin/stats/college - College stats
GET  /api/admin/my-permissions - My permissions
```

---

**Everything is ready! Login and start managing users! 🎉**
