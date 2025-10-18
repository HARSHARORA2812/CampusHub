# Cloudinary Setup for PDF Uploads

## Steps to Enable PDF Uploads

### 1. Create a Cloudinary Account
1. Go to https://cloudinary.com/
2. Sign up for a free account
3. Note your **Cloud Name** from the dashboard

### 2. Create an Upload Preset
1. Go to Settings → Upload
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Configure:
   - **Preset name**: `campus_hub_resources`
   - **Signing Mode**: `Unsigned` (for client-side uploads)
   - **Folder**: `campus_resources`
   - **Resource Type**: `Raw` (for PDFs)
   - **Allowed formats**: `pdf`
   - **Max file size**: `10485760` (10MB)
5. Save the preset

**Important**: PDFs use the `/raw/upload` endpoint in Cloudinary, not `/image/upload`!

### 3. Update Frontend Code
1. Open `/Users/harsh/temp_campushub/frontend/src/App.jsx`
2. Find line ~1299: `'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload'`
3. Replace `YOUR_CLOUD_NAME` with your actual Cloudinary cloud name

### 4. Test the Upload
1. Go to Resources page
2. Click "Share Resource"
3. Fill in details and select a PDF file
4. Submit - the file will be uploaded to Cloudinary

## Alternative: Use Backend Upload

For better security, you can implement server-side upload:

1. Install Cloudinary SDK in backend:
```bash
cd backend
npm install cloudinary
```

2. Create backend endpoint for file upload
3. Update frontend to send file to backend endpoint instead

## Free Tier Limits
- Storage: 25GB
- Bandwidth: 25GB/month
- Transformations: 25,000/month
