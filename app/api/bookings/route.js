
// import dbConnect from "@/lib/mongodb";
// import Booking from "@/models/Booking";
// import { NextResponse } from "next/server";
// import Event from "@/models/Event";
// import { sendEmail } from "@/lib/sendgrid";

// export async function POST(req) {
//   try {
//     await dbConnect();
//     const body = await req.json();

//     const booking = await Booking.create(body);
//     const event = await Event.findById(body.eventId);
// console.log("Creating booking:", booking, "for event:", event);
// console.log(event.image);

//     // Format date for better display
//     const eventDate = new Date(event.date).toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });

//     // Create enhanced HTML email template
//     const htmlTemplate = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Booking Confirmation</title>
//         <style>
//           * {
//             margin: 0;
//             padding: 0;
//             box-sizing: border-box;
//           }
          
//           body {
//             font-family: 'Arial', sans-serif;
//             line-height: 1.6;
//             color: #333;
//             background-color: #f4f4f4;
//           }
          
//           .email-container {
//             max-width: 600px;
//             margin: 20px auto;
//             background: #ffffff;
//             border-radius: 15px;
//             overflow: hidden;
//             box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//           }
          
//           .header {
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             padding: 30px 20px;
//             text-align: center;
//             color: white;
//           }
          
//           .header h1 {
//             font-size: 28px;
//             margin-bottom: 10px;
//             font-weight: 300;
//           }
          
//           .header .subtitle {
//             font-size: 16px;
//             opacity: 0.9;
//           }
          
//           .confirmation-badge {
//             display: inline-block;
//             background: rgba(255, 255, 255, 0.2);
//             padding: 8px 20px;
//             border-radius: 25px;
//             margin-top: 15px;
//             font-weight: bold;
//             backdrop-filter: blur(10px);
//           }
          
//           .content {
//             padding: 40px 30px;
//           }
          
//           .greeting {
//             font-size: 20px;
//             color: #2c3e50;
//             margin-bottom: 20px;
//           }
          
//           .event-card {
//             background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
//             border-radius: 15px;
//             padding: 25px;
//             margin: 25px 0;
//             color: white;
//             position: relative;
//             overflow: hidden;
//           }
          
//           .event-card::before {
//             content: '';
//             position: absolute;
//             top: -50%;
//             right: -50%;
//             width: 100%;
//             height: 100%;
//             background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
//             pointer-events: none;
//           }
          
//           .event-image {
//             width: 100%;
//             max-width: 200px;
//             height: 120px;
//             object-fit: cover;
//             border-radius: 10px;
//             margin-bottom: 20px;
//             border: 3px solid rgba(255, 255, 255, 0.3);
//           }
          
//           .event-title {
//             font-size: 24px;
//             font-weight: bold;
//             margin-bottom: 15px;
//             text-shadow: 0 2px 4px rgba(0,0,0,0.3);
//           }
          
//           .event-details {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//             gap: 15px;
//             margin-top: 20px;
//           }
          
//           .detail-item {
//             background: rgba(255, 255, 255, 0.15);
//             padding: 15px;
//             border-radius: 10px;
//             backdrop-filter: blur(5px);
//           }
          
//           .detail-label {
//             font-size: 12px;
//             text-transform: uppercase;
//             letter-spacing: 1px;
//             opacity: 0.8;
//             margin-bottom: 5px;
//           }
          
//           .detail-value {
//             font-size: 16px;
//             font-weight: bold;
//           }
          
//           .booking-summary {
//             background: #f8f9fa;
//             border-radius: 15px;
//             padding: 25px;
//             margin: 25px 0;
//             border-left: 5px solid #667eea;
//           }
          
//           .summary-title {
//             font-size: 18px;
//             color: #2c3e50;
//             margin-bottom: 15px;
//             display: flex;
//             align-items: center;
//           }
          
//           .summary-title::before {
//             content: '🎫';
//             font-size: 24px;
//             margin-right: 10px;
//           }
          
//           .summary-grid {
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
//             gap: 15px;
//           }
          
//           .summary-item {
//             text-align: center;
//           }
          
//           .summary-label {
//             font-size: 12px;
//             color: #7f8c8d;
//             text-transform: uppercase;
//             letter-spacing: 1px;
//             margin-bottom: 5px;
//           }
          
//           .summary-value {
//             font-size: 18px;
//             font-weight: bold;
//             color: #2c3e50;
//           }
          
//           .tickets-count {
//             background: linear-gradient(135deg, #667eea, #764ba2);
//             color: white;
//             padding: 10px 20px;
//             border-radius: 25px;
//             display: inline-block;
//           }
          
//           .message {
//             background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
//             color: #2c3e50;
//             padding: 20px;
//             border-radius: 15px;
//             margin: 25px 0;
//             text-align: center;
//           }
          
//           .cta-section {
//             text-align: center;
//             margin: 30px 0;
//           }
          
//           .cta-button {
//             display: inline-block;
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             color: white;
//             padding: 15px 30px;
//             border-radius: 25px;
//             text-decoration: none;
//             font-weight: bold;
//             box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
//             transition: transform 0.3s ease;
//           }
          
//           .footer {
//             background: #2c3e50;
//             color: white;
//             text-align: center;
//             padding: 30px 20px;
//           }
          
//           .footer p {
//             margin-bottom: 10px;
//           }
          
//           .social-links {
//             margin-top: 20px;
//           }
          
//           .social-links a {
//             display: inline-block;
//             margin: 0 10px;
//             color: #3498db;
//             text-decoration: none;
//           }
          
//           @media (max-width: 600px) {
//             .email-container {
//               margin: 10px;
//             }
            
//             .content {
//               padding: 20px;
//             }
            
//             .event-details {
//               grid-template-columns: 1fr;
//             }
            
//             .summary-grid {
//               grid-template-columns: 1fr;
//             }
//           }
//         </style>
//       </head>
//       <body>
//         <div class="email-container">
//           <!-- Header -->
//           <div class="header">
//             <h1>🎉 Booking Confirmed!</h1>
//             <p class="subtitle">Get ready for an amazing experience</p>
//             <div class="confirmation-badge">
//               ✅ Confirmed
//             </div>
//           </div>
          
//           <!-- Main Content -->
//           <div class="content">
//             <div class="greeting">
//               Hello ${body.name}! 👋
//             </div>
            
//             <p>We're excited to confirm your booking! Your adventure awaits.</p>
            
//             <!-- Event Card -->
//             <div class="event-card">
//               <img src="${event.image}" alt="trial" class="event-image">
              
//               <div class="event-title">${event.name}</div>
              
//               <div class="event-details">
//                 <div class="detail-item">
//                   <div class="detail-label">📅 Date</div>
//                   <div class="detail-value">${eventDate}</div>
//                 </div>
                
//                 <div class="detail-item">
//                   <div class="detail-label">⏰ Time</div>
//                   <div class="detail-value">${event.time || 'TBA'}</div>
//                 </div>
                
//                 <div class="detail-item">
//                   <div class="detail-label">📍 Venue</div>
//                   <div class="detail-value">${event.place || event.venue || 'TBA'}</div>
//                 </div>
                
//                 <div class="detail-item">
//                   <div class="detail-label">🎫 Your Tickets</div>
//                   <div class="detail-value">
//                     <span class="tickets-count">${body.numberOfTickets}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <!-- Booking Summary -->
//             <div class="booking-summary">
//               <div class="summary-title">Booking Summary</div>
              
//               <div class="summary-grid">
//                 <div class="summary-item">
//                   <div class="summary-label">Booking ID</div>
//                   <div class="summary-value">#${booking._id.toString().slice(-8).toUpperCase()}</div>
//                 </div>
                
//                 <div class="summary-item">
//                   <div class="summary-label">Tickets</div>
//                   <div class="summary-value">${body.numberOfTickets}</div>
//                 </div>
                
//                 <div class="summary-item">
//                   <div class="summary-label">Status</div>
//                   <div class="summary-value" style="color: #27ae60;">Confirmed ✅</div>
//                 </div>
//               </div>
//             </div>
            
//             <!-- Important Message -->
//             <div class="message">
//               <strong>📱 Save this email!</strong><br>
//               Present this confirmation email at the venue for entry. 
//               We recommend taking a screenshot for quick access.
//             </div>
            
//             <!-- Call to Action -->
//             <div class="cta-section">
//               <a href="#" class="cta-button">
//                 📅 Add to Calendar
//               </a>
//             </div>
            
//             <p style="margin-top: 30px; color: #7f8c8d; line-height: 1.8;">
//               <strong>What's next?</strong><br>
//               • Keep this email handy for event entry<br>
//               • Arrive 30 minutes early for smooth check-in<br>
//               • Follow us on social media for event updates<br>
//               • Contact us if you have any questions
//             </p>
//           </div>
          
//           <!-- Footer -->
//           <div class="footer">
//             <p><strong>Need help?</strong></p>
//             <p>Contact us at support@youreventsite.com or call (555) 123-4567</p>
            
//             <div class="social-links">
//               <a href="#">Facebook</a> |
//               <a href="#">Twitter</a> |
//               <a href="#">Instagram</a>
//             </div>
            
//             <p style="margin-top: 20px; font-size: 12px; opacity: 0.7;">
//               © 2025 Your Event Company. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;

//     // Send confirmation email with enhanced template
//     await sendEmail({
//       to: body.email,
//       subject: `🎉 Booking Confirmed - ${event.name}`,
//       text: `Hello ${body.name},\n\nYour booking for ${event.name} on ${eventDate} has been confirmed.\n\nBooking Details:\n- Event: ${event.name}\n- Date: ${eventDate}\n- Time: ${event.time || 'TBA'}\n- Venue: ${event.place || event.venue || 'TBA'}\n- Tickets: ${body.numberOfTickets}\n\nThank you for your booking!`,
//       html: htmlTemplate,
//     });

//     return new Response(JSON.stringify(booking), { status: 201 });
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     return NextResponse.json({ success: false, message: "Failed to create booking" }, { status: 500 });
//   }
// }

// export async function GET(req) {
//   await dbConnect();

//   try {
//     const bookings = await Booking.find({})
//       .populate("eventId", "name date time place venue image")
//       .exec(); // Populate event details including image

//     return new Response(JSON.stringify(bookings), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     return new Response(
//       JSON.stringify({ success: false, message: "Failed to fetch bookings" }),
//       { status: 500 }
//     );
//   }
// }
import dbConnect from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { NextResponse } from "next/server";
import Event from "@/models/Event";
import { sendEmail } from "@/lib/sendgrid";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    const booking = await Booking.create(body);
    const event = await Event.findById(body.eventId);
console.log("Creating booking:", booking, "for event:", event);
console.log(event.image);

    // Format date for better display
    const eventDate = new Date(event.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Ensure image URL is absolute and from a trusted source
    const imageUrl = event.image && event.image.startsWith('http') 
      ? event.image 
      : event.image 
        ? `${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}${event.image}`
        : 'https://via.placeholder.com/200x120/667eea/ffffff?text=Event+Image';

    // Create enhanced HTML email template
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
          }
          
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          }
          
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px 20px;
            text-align: center;
            color: white;
          }
          
          .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 300;
          }
          
          .header .subtitle {
            font-size: 16px;
            opacity: 0.9;
          }
          
          .confirmation-badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 20px;
            border-radius: 25px;
            margin-top: 15px;
            font-weight: bold;
            backdrop-filter: blur(10px);
          }
          
          .content {
            padding: 40px 30px;
          }
          
          .greeting {
            font-size: 20px;
            color: #2c3e50;
            margin-bottom: 20px;
          }
          
          .event-card {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border-radius: 15px;
            padding: 25px;
            margin: 25px 0;
            color: white;
            position: relative;
            overflow: hidden;
          }
          
          .event-card::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            pointer-events: none;
          }
          
          .event-image {
            width: 100%;
            max-width: 200px;
            height: 120px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            display: block;
          }
          
          .event-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 15px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          }
          
          .event-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
          }
          
          .detail-item {
            background: rgba(255, 255, 255, 0.15);
            padding: 15px;
            border-radius: 10px;
            backdrop-filter: blur(5px);
          }
          
          .detail-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.8;
            margin-bottom: 5px;
          }
          
          .detail-value {
            font-size: 16px;
            font-weight: bold;
          }
          
          .booking-summary {
            background: #f8f9fa;
            border-radius: 15px;
            padding: 25px;
            margin: 25px 0;
            border-left: 5px solid #667eea;
          }
          
          .summary-title {
            font-size: 18px;
            color: #2c3e50;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }
          
          .summary-title::before {
            content: '🎫';
            font-size: 24px;
            margin-right: 10px;
          }
          
          .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
          }
          
          .summary-item {
            text-align: center;
          }
          
          .summary-label {
            font-size: 12px;
            color: #7f8c8d;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 5px;
          }
          
          .summary-value {
            font-size: 18px;
            font-weight: bold;
            color: #2c3e50;
          }
          
          .tickets-count {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            display: inline-block;
          }
          
          .message {
            background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
            color: #2c3e50;
            padding: 20px;
            border-radius: 15px;
            margin: 25px 0;
            text-align: center;
          }
          
          .cta-section {
            text-align: center;
            margin: 30px 0;
          }
          
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            border-radius: 25px;
            text-decoration: none;
            font-weight: bold;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
            transition: transform 0.3s ease;
          }
          
          .footer {
            background: #2c3e50;
            color: white;
            text-align: center;
            padding: 30px 20px;
          }
          
          .footer p {
            margin-bottom: 10px;
          }
          
          .social-links {
            margin-top: 20px;
          }
          
          .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #3498db;
            text-decoration: none;
          }
          
          @media (max-width: 600px) {
            .email-container {
              margin: 10px;
            }
            
            .content {
              padding: 20px;
            }
            
            .event-details {
              grid-template-columns: 1fr;
            }
            
            .summary-grid {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header -->
          <div class="header">
            <h1>🎉 Booking Confirmed!</h1>
            <p class="subtitle">Get ready for an amazing experience</p>
            <div class="confirmation-badge">
              ✅ Confirmed
            </div>
          </div>
          
          <!-- Main Content -->
          <div class="content">
            <div class="greeting">
              Hello ${body.name}! 👋
            </div>
            
            <p>We're excited to confirm your booking! Your adventure awaits.</p>
            
            <!-- Event Card -->
            <div class="event-card">
              <img src="${imageUrl}" alt="${event.name}" class="event-image" style="display: block;">
              
              <div class="event-title">${event.name}</div>
              
              <div class="event-details">
                <div class="detail-item">
                  <div class="detail-label">📅 Date</div>
                  <div class="detail-value">${eventDate}</div>
                </div>
                
                <div class="detail-item">
                  <div class="detail-label">⏰ Time</div>
                  <div class="detail-value">${event.time || 'TBA'}</div>
                </div>
                
                <div class="detail-item">
                  <div class="detail-label">📍 Venue</div>
                  <div class="detail-value">${event.place || event.venue || 'TBA'}</div>
                </div>
                
                <div class="detail-item">
                  <div class="detail-label">🎫 Your Tickets</div>
                  <div class="detail-value">
                    <span class="tickets-count">${body.numberOfTickets}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Booking Summary -->
            <div class="booking-summary">
              <div class="summary-title">Booking Summary</div>
              
              <div class="summary-grid">
                <div class="summary-item">
                  <div class="summary-label">Booking ID</div>
                  <div class="summary-value">#${booking._id.toString().slice(-8).toUpperCase()}</div>
                </div>
                
                <div class="summary-item">
                  <div class="summary-label">Tickets</div>
                  <div class="summary-value">${body.numberOfTickets}</div>
                </div>
                
                <div class="summary-item">
                  <div class="summary-label">Status</div>
                  <div class="summary-value" style="color: #27ae60;">Confirmed ✅</div>
                </div>
              </div>
            </div>
            
            <!-- Important Message -->
            <div class="message">
              <strong>📱 Save this email!</strong><br>
              Present this confirmation email at the venue for entry. 
              We recommend taking a screenshot for quick access.
            </div>
            
            <!-- Call to Action -->
            <div class="cta-section">
              <a href="#" class="cta-button">
                📅 Add to Calendar
              </a>
            </div>
            
            <p style="margin-top: 30px; color: #7f8c8d; line-height: 1.8;">
              <strong>What's next?</strong><br>
              • Keep this email handy for event entry<br>
              • Arrive 30 minutes early for smooth check-in<br>
              • Follow us on social media for event updates<br>
              • Contact us if you have any questions
            </p>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <p><strong>Need help?</strong></p>
            <p>Contact us at sinhaaryan173.com or call (555) 123-4567</p>
            
            <div class="social-links">
              <a href="#">Facebook</a> |
              <a href="#">Twitter</a> |
              <a href="#">Instagram</a>
            </div>
            
            <p style="margin-top: 20px; font-size: 12px; opacity: 0.7;">
              © 2025 Your Event Company. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send confirmation email with enhanced template
    await sendEmail({
      to: body.email,
      subject: `🎉 Booking Confirmed - ${event.name}`,
      text: `Hello ${body.name},\n\nYour booking for ${event.name} on ${eventDate} has been confirmed.\n\nBooking Details:\n- Event: ${event.name}\n- Date: ${eventDate}\n- Time: ${event.time || 'TBA'}\n- Venue: ${event.place || event.venue || 'TBA'}\n- Tickets: ${body.numberOfTickets}\n\nThank you for your booking!`,
      html: htmlTemplate,
    });

    return new Response(JSON.stringify(booking), { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ success: false, message: "Failed to create booking" }, { status: 500 });
  }
}

export async function GET(req) {
  await dbConnect();

  try {
    const bookings = await Booking.find({})
      .populate("eventId", "name date time place venue image")
      .exec(); // Populate event details including image

    return new Response(JSON.stringify(bookings), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch bookings" }),
      { status: 500 }
    );
  }
}