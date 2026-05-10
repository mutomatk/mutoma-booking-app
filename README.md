# LuxeStay Apartments Website

A premium apartment booking website for LuxeStay Apartments in Ndola, Zambia (Itawa Area).

## Features

- Responsive design for all devices
- Browse apartment listings with filters
- Book apartments with customer details
- Dynamic pricing calculation
- Local storage for apartment data
- Professional UI/UX

## Project Structure

```
apartment bookings/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── server.js           # Node.js Express server
├── package.json        # Project dependencies
├── .htaccess          # Apache server configuration
├── nginx.conf         # Nginx server configuration
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Local Development

### Option 1: Node.js/Express Server (Recommended)

1. Install Node.js from [nodejs.org](https://nodejs.org)

2. Navigate to project directory:
   ```bash
   cd "apartment bookings"
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open browser and visit: `http://localhost:3000`

### Option 2: Live Server (VS Code)

1. Install "Live Server" extension in VS Code
2. Right-click `index.html` and select "Open with Live Server"

### Option 3: Python Simple Server

```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000
```

## Deployment

### On Shared Hosting (cPanel/Apache)

1. Upload all files to your `public_html` folder
2. The `.htaccess` file is included for URL rewriting
3. Ensure `.htaccess` is enabled in your hosting control panel

### On VPS/Dedicated Server (Nginx)

1. Copy all files to `/var/www/luxestay/`
2. Use the provided `nginx.conf` configuration
3. Update the `server_name` with your domain

### On Cloud Platforms

**Netlify/Vercel:**
- Drag and drop the folder or connect your Git repository

**Heroku:**
```bash
heroku create your-app-name
git push heroku main
```

**AWS S3 + CloudFront:**
- Upload files to S3 bucket
- Configure CloudFront distribution

## Configuration

### Custom Domain

Update your domain's DNS records to point to your hosting provider:
- **Type**: A Record
- **Name**: @ or www
- **Value**: Your server IP address

### Environment Variables

For production, create a `.env` file (optional for static hosting):
```
PORT=3000
NODE_ENV=production
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling & Responsive Design
- **JavaScript (Vanilla)** - Interactivity
- **LocalStorage** - Data persistence
- **Express.js** - Server (optional)

## Features

✅ Responsive Mobile Design
✅ Search and Filter Apartments
✅ Booking System with Price Calculation
✅ Contact Information
✅ Professional Branding
✅ Local Data Storage

## Contact

**LuxeStay Apartments**
- 📍 Itawa Area, Ndola, Zambia
- 📞 +1 (555) 789-0123
- 📧 info@luxestay.com

## License

MIT License - Feel free to use and modify

---

**Last Updated**: January 24, 2026
