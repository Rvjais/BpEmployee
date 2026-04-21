# 🚀 Vercel Deployment Guide

I have restructured your project to be compatible with Vercel's serverless environment. All your code is now in one place, and your backend has been converted into a **Serverless Function** inside the `api/` folder.

## 📋 Pre-Deployment steps

1.  **Stop Local Processes**: You no longer need to run `node index.js`.
2.  **Delete Local Env**: Vercel handles environment variables via their dashboard. I have kept your `.env` for local reference, but it won't be used in production.

## 🚢 How to Deploy

### Option 1: Using GitHub (Recommended)
1.  **Push to GitHub**: Initialize a Git repository if you haven't already, commit all files, and push to a new GitHub repo.
2.  **Import to Vercel**:
    - Go to [Vercel Dashboard](https://vercel.com/new).
    - Choose **Import Project** and select your GitHub repo.
3.  **Configure Project**:
    - **Framework Preset**: Select **Vite**.
    - **Build Command**: `npm run build`
    - **Output Directory**: `dist`
4.  **Add Environment Variables**:
    - Expand the **Environment Variables** section.
    - Add **Key**: `MONGODB_URI`
    - Add **Value**: `mongodb+srv://ranveerjais998:ranveerjais998@cluster0.ekkexw9.mongodb.net/bp_employee?appName=Cluster0`
5.  **Deploy!**: Click **Deploy**. Your app will be live in ~2 minutes at a `.vercel.app` URL.

### Option 2: Using Vercel CLI (Manual)
If you have the Vercel CLI installed (`npm install -g vercel`), simply run:
```bash
vercel
```
Then follow the prompts and remember to add the `MONGODB_URI` in the UI.

## 🧹 Cleanup Note
I have automatically deleted all `.log` files and the old `server/` directory. Your project is now clean and ready for version control!

## 🧪 Testing Locally
To test the new structure locally, use:
```bash
npx vercel dev
```
This mimics the Vercel cloud environment perfectly on your machine.
