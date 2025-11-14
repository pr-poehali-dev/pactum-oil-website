'''
Business: Send product request form to email
Args: event with httpMethod, body containing form data
Returns: HTTP response with success/error status
'''

import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
import os

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    # Extract form data
    name = body_data.get('name', '')
    phone = body_data.get('phone', '')
    product_name = body_data.get('productName', '')
    specification = body_data.get('specification', '')
    quantity = body_data.get('quantity', '')
    destination = body_data.get('destination', '')
    notes = body_data.get('notes', '')
    
    # Validate required fields
    if not all([name, phone, product_name, specification, quantity, destination]):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing required fields'}),
            'isBase64Encoded': False
        }
    
    # Get email credentials from environment
    smtp_host = os.environ.get('SMTP_HOST', 'smtp.mail.ru')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    recipient_email = 'mnalgiev@internet.ru'
    
    # Create email message
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новый запрос продукции от {name}'
    msg['From'] = smtp_user
    msg['To'] = recipient_email
    
    # Create HTML email body
    html_body = f'''
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #FF8C00;">Новый запрос продукции</h2>
            <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 200px;">Имя:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Телефон:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{phone}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Наименование:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{product_name}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Детальная спецификация:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{specification}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Количество:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{quantity}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Место назначения:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{destination}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Примечания:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">{notes if notes else 'Не указаны'}</td>
                </tr>
            </table>
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
                Это автоматическое сообщение с сайта Pactum Oil Company
            </p>
        </body>
    </html>
    '''
    
    html_part = MIMEText(html_body, 'html', 'utf-8')
    msg.attach(html_part)
    
    # Send email
    try:
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Email sent successfully'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Failed to send email: {str(e)}'}),
            'isBase64Encoded': False
        }
