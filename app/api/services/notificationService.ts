import { NotificationType, NotificationStatus } from '@/app/generated/prisma/enums';
import { prisma } from '@/app/lib/prisma';

export async function queueNotification(params: {
  userId?: string;
  email: string;
  type: NotificationType;
  payload?: Record<string, any>;
}) {
  try {
    // Create queued notification log record
    const log = await prisma.notificationLog.create({
      data: {
        userId: params.userId || null,
        email: params.email,
        type: params.type,
        status: NotificationStatus.QUEUED,
        payload: params.payload || {},
      },
    });

    // In production, integrate with transactional email provider (e.g. Resend / SendGrid / Postmark)
    // Example dispatch hook:
    // await sendEmailViaProvider(log.email, log.type, log.payload);

    // Mark as sent for demonstration
    await prisma.notificationLog.update({
      where: { id: log.id },
      data: {
        status: NotificationStatus.SENT,
        sentAt: new Date(),
        providerMessageId: `msg-${Date.now()}`,
      },
    });

    return log;
  } catch (error: any) {
    console.error('Notification queue error:', error);
    if (params.email) {
      await prisma.notificationLog.create({
        data: {
          userId: params.userId || null,
          email: params.email,
          type: params.type,
          status: NotificationStatus.FAILED,
          errorMessage: error.message || 'Unknown email dispatch error',
        },
      });
    }
  }
}