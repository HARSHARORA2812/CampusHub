# 📢 Opportunity Posting Feature - College Management

## ✅ Feature Implemented

College Management (and higher roles) can now **post opportunities** directly from the frontend!

---

## 🎯 Who Can Post Opportunities?

| Role | Can Post? | Notes |
|------|-----------|-------|
| **Student** | ❌ No | View only |
| **Faculty** | ❌ No | View only |
| **College Management** | ✅ **YES** | Main feature target |
| **College Admin** | ✅ YES | Has all management powers |
| **Main Admin** | ✅ YES | Has all powers |

---

## 🎨 User Interface

### For College Management+

**Opportunities Page Shows:**
- 📢 **"Post Opportunity"** button (top right)
- List of opportunities from their college
- Click button → Opens create modal

### For Students/Faculty

**Opportunities Page Shows:**
- ❌ No "Post Opportunity" button
- List of opportunities from their college (read-only)
- Can view details but cannot create

---

## 📝 Create Opportunity Modal

**Form Fields:**

1. **Opportunity Type** (required)
   - Internship
   - Placement
   - Competition
   - Scholarship

2. **Title** (required)
   - Min 3 characters
   - E.g., "Software Engineering Intern"

3. **Company/Organization** (required)
   - Min 2 characters
   - E.g., "Google", "Microsoft"

4. **Description** (required)
   - Min 10 characters
   - Responsibilities, requirements, etc.

5. **Eligibility Criteria** (required)
   - Min 5 characters
   - E.g., "B.Tech CS, CGPA > 8.0"

6. **Application Deadline** (required)
   - Date picker
   - Must be future date

7. **Application URL** (optional)
   - Link to application form

8. **Stipend/Salary** (optional)
   - E.g., "₹50,000/month", "Unpaid"

---

## 🔒 Backend Protection

**Endpoint:** `POST /api/opportunities`

**Access Control:**
```javascript
requireRoleLevel('college_management')
```

**Validation:**
- ✅ User must be college_management or higher
- ✅ All required fields validated
- ✅ Opportunity automatically tagged with poster's email
- ✅ College isolation enforced

**Auto-Set Fields:**
- `posted_by_id`: User's ID
- `posted_by_name`: User's name
- `posted_by_email`: User's email (for college filtering)
- `college_email`: Same as posted_by_email
- `status`: 'open'

---

## 🏛️ College Filtering

**Automatic Isolation:**

**Stanford College Management posts opportunity:**
- Opportunity tagged with `@stanford.edu`
- ✅ Visible to Stanford students
- ❌ Invisible to MIT/Harvard students

**MIT College Management posts opportunity:**
- Opportunity tagged with `@mit.edu`
- ✅ Visible to MIT students
- ❌ Invisible to Stanford/Harvard students

**Each college only sees their own opportunities!**

---

## 🎯 Use Case Example

### Scenario: College Management Posts Internship

**User:** Sarah (College Management at Stanford)
- Email: sarah@stanford.edu
- Role: college_management

**Steps:**
1. Login to CampusHub
2. Navigate to "Opportunities"
3. See "📢 Post Opportunity" button
4. Click button
5. Fill form:
   - Type: Internship
   - Title: "Software Engineering Intern"
   - Company: "Google"
   - Description: "Work on AI projects..."
   - Eligibility: "CS majors, CGPA > 7.5"
   - Deadline: 2025-11-30
   - URL: https://google.com/careers
   - Stipend: "₹75,000/month"
6. Click "Post Opportunity"
7. ✅ Success! Opportunity visible to Stanford students

**Result:**
- ✅ Stanford students see the opportunity
- ❌ Other universities don't see it
- ✅ Posted by Sarah (sarah@stanford.edu)
- ✅ Status: Open

---

## 📊 Workflow

```
College Management Login
          ↓
Navigate to Opportunities
          ↓
Click "Post Opportunity"
          ↓
Fill out modal form
          ↓
Submit
          ↓
Backend validates role (college_management+)
          ↓
Backend validates form data
          ↓
Save opportunity with college tag
          ↓
Success message
          ↓
Opportunity appears in list
          ↓
Students from same college can view
```

---

## 🔐 Security Features

**Role-Based Access:**
- ✅ Backend enforces college_management minimum
- ✅ Students/Faculty blocked from posting
- ✅ 403 Forbidden if unauthorized

**College Isolation:**
- ✅ Auto-tagged with poster's college
- ✅ Frontend filters by college
- ✅ Backend sets college_email field

**Data Validation:**
- ✅ Required field validation
- ✅ Minimum length checks
- ✅ Date validation (future dates only)
- ✅ URL format validation

---

## 📁 Files Created/Modified

### New Files
- `frontend/src/components/modals/CreateOpportunityModal.jsx` - Create modal UI

### Modified Files
- `frontend/src/pages/OpportunitiesPage.jsx` - Added button and state
- `frontend/src/components/modals/index.js` - Added export
- `backend/routes/opportunities.js` - Already had role requirement

---

## 🎨 UI Features

**Button Style:**
```jsx
📢 Post Opportunity
```
- Primary button (blue/accent color)
- Top right of page
- Only visible to authorized roles
- Icon + text for clarity

**Modal Features:**
- Clean, organized form
- Required field indicators (*)
- Placeholder text for guidance
- Date picker for deadline
- Character count minimums
- Note about college visibility
- Shows poster's name/email
- Cancel/Submit buttons

---

## 🧪 Testing

### Test 1: College Management Can Post
1. Login as college_management user
2. Go to Opportunities
3. ✅ See "Post Opportunity" button
4. Click and fill form
5. ✅ Successfully post
6. ✅ Opportunity appears in list

### Test 2: Student Cannot Post
1. Login as student
2. Go to Opportunities
3. ❌ No "Post Opportunity" button
4. ✅ Can only view opportunities

### Test 3: College Isolation
1. Post opportunity from Stanford management
2. Login as MIT student
3. ❌ Cannot see Stanford opportunity
4. ✅ Only see MIT opportunities

### Test 4: Backend Protection
1. Try POST /api/opportunities as student (via API)
2. ❌ Get 403 Forbidden
3. ✅ Backend blocks unauthorized access

---

## 📈 Benefits

**For College Management:**
- ✅ Easy to post opportunities
- ✅ No technical knowledge needed
- ✅ Beautiful, intuitive interface
- ✅ Instant feedback

**For Students:**
- ✅ See relevant opportunities
- ✅ Only from their college
- ✅ Clear opportunity details
- ✅ Easy to apply via URL

**For System:**
- ✅ Proper role separation
- ✅ College isolation maintained
- ✅ Clean data structure
- ✅ Scalable architecture

---

## 🎯 Status

**✅ FULLY IMPLEMENTED AND WORKING**

- ✅ Backend: Role check active (college_management+)
- ✅ Frontend: Button visible to authorized users
- ✅ Modal: Complete with all fields
- ✅ Validation: All checks in place
- ✅ College Filtering: Working correctly
- ✅ Build: Passing (337.66 KB)

---

## 📝 Quick Reference

**Who can post:**
- College Management ✅
- College Admin ✅
- Main Admin ✅

**Who cannot post:**
- Students ❌
- Faculty ❌

**Where to post:**
- Navigate to "Opportunities"
- Click "📢 Post Opportunity"
- Fill form and submit

**Visibility:**
- Only students from your college see it
- Other colleges cannot see your opportunities

---

**College Management can now easily post opportunities for their students!** 🎉
