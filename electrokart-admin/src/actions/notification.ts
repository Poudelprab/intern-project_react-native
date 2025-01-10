'use server';

import { createClient } from '@/supabase/server';

async function sendPushNotification({
  expoPushToken,
  title,
  body,
}: {
  expoPushToken: string;
  title: string;
  body: string;
}) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title,
    body,
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export const getUserNotificationToken = async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('users')
    .select('expo_notification_token')
    .eq('id', userId)
    .single<{ expo_notification_token: string }>();

  if (error) throw new Error(error.message);

  return data.expo_notification_token;
};

export const sendNotification = async (userId: string, status: string) => {
  const expoNotificationToken = await getUserNotificationToken(userId);

  if (!expoNotificationToken) {
    return;
  }

  await sendPushNotification({
    expoPushToken: expoNotificationToken,
    title: 'Your Order Status',
    body: `Your order is now ${status}`,
  });
};