import { Prisma, Notification as PrismaNotification } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class PrismaNotificationMapper {
  static toDomain(raw: PrismaNotification): Notification {
    return Notification.create(
      {
        content: raw.content,
        recipientId: new UniqueEntityID(raw.recipientId),
        title: raw.title,
        createdAt: raw.createdAt,
        readAt: raw.readAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    notification: Notification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notification.id.toString(),
      recipientId: notification.recipientId.toString(),
      title: notification.title,
      content: notification.content,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
    }
  }
}
