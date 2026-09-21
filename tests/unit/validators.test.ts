import { describe, it, expect } from 'vitest';
import { 
  ViewingRequestSchema, 
  ValuationRequestSchema, 
  ContactFormSchema,
  PropertyFormSchema 
} from '../../src/lib/validators';

describe('Lead & Viewing Form Validators', () => {
  it('validates a correct viewing request payload', () => {
    const validData = {
      name: 'Eleanor Roosevelt',
      phone: '+254 712 345 678',
      email: 'eleanor@domain.org',
      preferred_date: '2026-04-10',
      preferred_time: '14:00 - 16:00',
      message: 'Diplomatic security verification requested.',
      honeypot: '',
    };
    const result = ViewingRequestSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects bot submission when honeypot field is filled', () => {
    const botData = {
      name: 'Spam Bot',
      phone: '+254 712 345 678',
      preferred_date: '2026-04-10',
      preferred_time: '10:00 - 12:00',
      honeypot: 'http://spam-link.com',
    };
    const result = ViewingRequestSchema.safeParse(botData);
    expect(result.success).toBe(false);
  });

  it('validates a valuation request with bedroom counts and asset category', () => {
    const valuationData = {
      name: 'Jonathan Miller',
      phone: '+44 7700 900123',
      valuation_property_type: 'Estate / Villa',
      valuation_bedrooms: 5,
      valuation_address: 'Windy Ridge Lane, Karen, Nairobi',
      honeypot: '',
    };
    const result = ValuationRequestSchema.safeParse(valuationData);
    expect(result.success).toBe(true);
  });

  it('rejects an invalid phone format', () => {
    const invalidPhoneData = {
      name: 'Marcus',
      phone: 'invalid-phone',
      message: 'Testing message',
    };
    const result = ContactFormSchema.safeParse(invalidPhoneData);
    expect(result.success).toBe(false);
  });
});

describe('Property Schema Validator', () => {
  it('validates valid property creation payload', () => {
    const propData = {
      title: 'The Glass Pavilion at Karen',
      listing_type: 'buy' as const,
      status: 'pending_approval' as const,
      price: 285000000,
      bedrooms: 5,
      bathrooms: 6,
      size_sqm: 820,
      neighborhood_id: 'neigh-karen',
      address: 'Windy Ridge Lane, Karen',
      description: 'An iconic modern glass estate set within lush botanical forest gardens with 6m double volume living areas.',
      amenities: ['Pool', 'Wine Cellar'],
      featured: true,
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c'],
    };
    const result = PropertyFormSchema.safeParse(propData);
    expect(result.success).toBe(true);
  });
});
