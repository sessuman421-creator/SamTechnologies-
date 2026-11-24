import { STUDIO_CONTACT } from '../data/studioData';

export interface PrefillInquiryParams {
  intent?: string;
  serviceName?: string;
  packageLabel?: string;
  priceText?: string;
  deliveryWindow?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  notes?: string;
}

export function buildPrefilledMessageText(params: PrefillInquiryParams = {}): string {
  const lines: string[] = [
    `Hello ${STUDIO_CONTACT.founder} (${STUDIO_CONTACT.brand}),`,
    '',
    params.intent
      ? `I would like to reach out regarding: ${params.intent}.`
      : 'I would like to discuss a software or GenAI project with SamTechnologies.',
  ];

  if (params.serviceName) {
    lines.push('');
    lines.push(`Service: ${params.serviceName}${params.packageLabel ? ` (${params.packageLabel})` : ''}`);
  }
  if (params.priceText) {
    lines.push(`Budget / Rate: ${params.priceText}`);
  }
  if (params.deliveryWindow) {
    lines.push(`Timeline: ${params.deliveryWindow}`);
  }
  if (params.clientName || params.clientEmail || params.clientPhone) {
    lines.push('');
    if (params.clientName) lines.push(`Name: ${params.clientName}`);
    if (params.clientEmail) lines.push(`Email: ${params.clientEmail}`);
    if (params.clientPhone) lines.push(`Phone: ${params.clientPhone}`);
  }
  if (params.notes) {
    lines.push('');
    lines.push(`Project Details / Need:`);
    lines.push(params.notes);
  } else {
    lines.push('');
    lines.push('Here is what I need:');
    lines.push('- Project Goal: ');
    lines.push('- Preferred Timeline: ');
  }

  return lines.join('\n');
}

export function buildWhatsAppHref(params: PrefillInquiryParams = {}): string {
  const text = buildPrefilledMessageText(params);
  return `https://wa.me/233204704510?text=${encodeURIComponent(text)}`;
}

export function buildEmailHref(
  params: PrefillInquiryParams = {},
  recipient: string = STUDIO_CONTACT.primaryEmail
): string {
  const subject = params.serviceName
    ? `[SamTechnologies] ${params.serviceName}${params.packageLabel ? ` — ${params.packageLabel}` : ''}`
    : params.intent
    ? `[SamTechnologies] ${params.intent}`
    : '[SamTechnologies] Project & Hiring Inquiry';
  const body = buildPrefilledMessageText(params);
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
