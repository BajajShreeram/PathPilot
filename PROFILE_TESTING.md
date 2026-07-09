# Profile System Testing Guide

## Overview
This document outlines all profile-related logic, validation, and testing scenarios for the PathPilot application.

## Core Features

### 1. Profile Data Structure
```typescript
interface ProfileData {
  name: string;
  gradeClass: string;
  country: string;
  favouriteSubjects: string[];
  careerInterests: string[];
  dreamUniversity?: string;
  budget: string;
  needScholarships: boolean;
}
```

### 2. Data Persistence
- **Storage**: localStorage with key `pathpilot_profile`
- **Format**: JSON stringified ProfileData object
- **Persistence**: Data persists across browser sessions
- **Clear**: Can be manually cleared via browser dev tools or ProfileTestPage

## Validation Rules

### Required Fields
1. **name** - Non-empty string, minimum 2 characters
2. **gradeClass** - Non-empty string
3. **country** - Valid country code from predefined list
4. **favouriteSubjects** - Array with at least 1 item, maximum 5
5. **careerInterests** - Array with at least 1 item, maximum 5
6. **budget** - One of: LOW, MEDIUM, HIGH, VERY_HIGH

### Optional Fields
- **dreamUniversity** - String (can be empty)
- **needScholarships** - Boolean (always has value, defaults to false)

### Validation Functions
- `isProfileComplete()` - Checks all required fields are filled
- `getProfileCompletionPercentage()` - Returns 0-100% completion
- `getMissingFields()` - Returns array of missing field names
- `validateProfileField()` - Validates individual fields with specific rules

## Edge Cases & Testing

### Test Case 1: Empty Profile
**Scenario**: User accesses dashboard without creating profile
**Expected**:
- Dashboard shows "Create Profile" alert
- Profile completion: 0%
- Missing fields: All required fields
- Link to onboarding page displayed

**Test**: Visit `/dashboard` in fresh browser session (clear localStorage first)

### Test Case 2: Incomplete Profile
**Scenario**: User partially fills onboarding form
**Expected**:
- Dashboard shows "Complete Profile" warning with percentage
- Missing fields listed clearly
- Can still access all dashboard features
- Profile completion shows accurate percentage

**Test**: Load mock profile "minimal" or partially fill form

### Test Case 3: Complete Profile
**Scenario**: User completes all required fields
**Expected**:
- No warnings on dashboard
- Profile completion: 100% (if dream university filled) or 87.5% (if not)
- All profile data displays correctly
- Recommendations generated based on profile

**Test**: Load mock profile "complete" or fill entire form

### Test Case 4: localStorage Corruption
**Scenario**: Invalid JSON in localStorage
**Expected**:
- App gracefully handles error
- Treats as no profile
- Doesn't crash application

**Test**: Manually set invalid JSON in localStorage:
```javascript
localStorage.setItem('pathpilot_profile', '{invalid json}')
```

### Test Case 5: Data Persistence
**Scenario**: User fills profile, closes browser, returns
**Expected**:
- Profile data still available
- All selections preserved
- No data loss

**Test**:
1. Complete onboarding
2. Close browser completely
3. Reopen and visit dashboard
4. Verify data is intact

### Test Case 6: Multi-Selection Edge Cases
**Scenario**: User selects maximum subjects/careers
**Expected**:
- Validation prevents more than 5 selections
- UI indicates maximum reached
- Form submission works correctly

**Test**: Try selecting 6+ subjects in onboarding form

### Test Case 7: Special Characters in Text Fields
**Scenario**: User enters special characters in name/university
**Expected**:
- Special characters accepted
- No XSS vulnerabilities
- Data stored and retrieved correctly

**Test**: Enter name like "O'Brien" or "José García-López"

### Test Case 8: Very Long Text Input
**Scenario**: User enters very long text in fields
**Expected**:
- Text accepted (no hard limit)
- UI handles display gracefully
- No layout breaking

**Test**: Enter 200+ character string in dream university field

### Test Case 9: Budget-Based Recommendations
**Scenario**: User selects different budget levels
**Expected**:
- LOW/MEDIUM: Scholarship recommendations prioritized
- HIGH/VERY_HIGH: Premium universities shown
- needsScholarships function works correctly

**Test**: Load different mock profiles and check recommendations

### Test Case 10: Cross-Browser Compatibility
**Scenario**: localStorage works across browsers
**Expected**:
- Data isolated per browser
- Each browser has independent storage
- No cross-contamination

**Test**: Create profiles in Chrome, Firefox, Edge separately

## Mock Profiles for Testing

Use `/profile-test` page to load these scenarios:

1. **complete** - Fully filled profile, US student, STEM focus
2. **minimal** - Only required fields, UK student, education focus
3. **international** - Indian student, medicine focus, needs scholarships
4. **arts** - Canadian student, arts focus, high budget
5. **business** - Singapore student, business focus, no scholarships
6. **undecided** - Australian student, multiple interests, exploring

## Recommendation Engine Testing

### University Recommendations
Test that recommendations match:
- Career interests (Engineering → MIT, Stanford)
- Subject preferences (CS → tech schools)
- Budget constraints (Low → affordable universities)
- Geographic location (International students → diverse options)

### Scholarship Recommendations
Test that recommendations consider:
- needScholarships flag
- Budget level (LOW/MEDIUM → more scholarships)
- Academic focus (STEM → science scholarships)
- International status (Non-US → international scholarships)

### Career Recommendations
Test alignment between:
- Favourite subjects and career suggestions
- Existing career interests (suggest related paths)
- Unconsidered but relevant options

## Dashboard Profile Integration

### Profile Display
- Welcome message shows user name
- Dream career shows first career interest
- Dream university shows saved value or placeholder
- Stats show accurate counts

### Profile Completion Alerts
- Alert appears only when profile incomplete
- Shows accurate completion percentage
- Lists missing fields clearly
- Provides actionable button to complete

### Profile-Based Features
- Scholarship section highlights if needScholarships true
- Universities filter by budget when applicable
- Roadmap customizes based on grade/class
- Deadlines show relevant dates

## Manual Testing Checklist

### Onboarding Flow
- [ ] All fields render correctly
- [ ] Validation shows on blur or submit
- [ ] Multi-select buttons toggle correctly
- [ ] Required field indicators clear
- [ ] Form submits only when valid
- [ ] Redirects to dashboard after submit
- [ ] Data saves to localStorage

### Dashboard Behavior
- [ ] Shows appropriate alert (none/complete/no profile)
- [ ] Profile data displays correctly
- [ ] Stats calculate accurately
- [ ] All cards are clickable
- [ ] Navigation works properly
- [ ] Profile test link appears when needed

### Data Persistence
- [ ] Data survives page refresh
- [ ] Data survives browser restart
- [ ] Data can be updated via onboarding
- [ ] Data can be cleared manually
- [ ] No duplicate storage entries

### Profile Test Page
- [ ] All mock profiles load correctly
- [ ] Clear profile button works
- [ ] Validation results accurate
- [ ] Profile data displays properly
- [ ] Test results match expectations
- [ ] Navigation buttons work

### Edge Cases
- [ ] Empty localStorage handled
- [ ] Invalid JSON handled gracefully
- [ ] Missing fields detected
- [ ] Excess data ignored
- [ ] Special characters work
- [ ] Long text handled properly

## Browser Console Tests

Open browser console and run these commands:

```javascript
// 1. Check current profile
const profile = JSON.parse(localStorage.getItem('pathpilot_profile'));
console.log('Current Profile:', profile);

// 2. Validate profile
import { isProfileComplete } from './utils/profileValidation';
console.log('Is Complete:', isProfileComplete(profile));

// 3. Check completion percentage
import { getProfileCompletionPercentage } from './utils/profileValidation';
console.log('Completion:', getProfileCompletionPercentage(profile) + '%');

// 4. Test recommendations
import { getAllRecommendations } from './utils/recommendations';
console.log('Recommendations:', getAllRecommendations(profile));

// 5. Clear profile
localStorage.removeItem('pathpilot_profile');
console.log('Profile cleared');
```

## Known Limitations

1. **No server sync** - Data only stored locally
2. **No encryption** - localStorage is plain text
3. **No backup** - Clearing browser data loses profile
4. **No versioning** - Profile structure changes may break old data
5. **No multi-device** - Profile doesn't sync across devices

## Future Enhancements

1. Add profile editing page
2. Implement server-side storage
3. Add profile export/import
4. Support multiple profiles (family members)
5. Add profile versioning and migration
6. Implement profile backup reminders
7. Add profile completion gamification
8. Support profile sharing/referrals

## Troubleshooting

### Profile Not Saving
1. Check browser localStorage enabled
2. Verify not in incognito/private mode
3. Check storage quota not exceeded
4. Inspect browser console for errors

### Profile Not Loading
1. Check localStorage has 'pathpilot_profile' key
2. Verify JSON is valid
3. Check for console errors
4. Try clearing and recreating profile

### Validation Not Working
1. Verify all required fields filled
2. Check array fields have items
3. Ensure country is valid code
4. Check budget is valid value

### Recommendations Empty
1. Ensure profile exists and complete
2. Verify career interests and subjects set
3. Check recommendation logic matches profile
4. Inspect console for calculation errors
