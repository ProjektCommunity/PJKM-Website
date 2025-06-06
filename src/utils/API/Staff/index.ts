// Placeholder for Staff data structures based on API Stuff.md
// These should be refined based on actual API response and frontend needs.

interface UserProfilePhoto {
  id: number;
  path: string; // URL to the image
  // other fields if any
}

interface User {
  id: number;
  username: string;
  profile_photo_id?: number;
  ProfilePhoto?: UserProfilePhoto; // Assuming ProfilePhoto is populated
  // other user fields
}

interface JobTitle {
  id: number;
  name: string;
  // other job title fields
}

interface Department {
  id: number;
  name: string;
  JobTitles?: JobTitle[]; // Assuming JobTitles are populated within Department
  // other department fields
}

interface StaffMemberResponse {
  id: number; // This is Staff.id
  user_id: number;
  User: User; // Populated User details
  Departments: DepartmentAssignment[]; // Staff's departments and their job titles within them
  // other staff fields
}

interface DepartmentAssignment { // Represents the StaffDepartmentJobTitles through-table structure
    department_id: number;
    Department: Department; // Populated Department details
    JobTitles: JobTitle[]; // Job titles specifically for this staff member in this department
}


interface StaffApiResponse {
  error: boolean;
  data: StaffMemberResponse[];
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.projektcommunity.com'; // Or your local dev URL

/**
 * Fetches the list of staff members from the API.
 */
export const getStaffList = async (): Promise<StaffMemberResponse[]> => {
  try {
    // const response = await fetch(`${API_BASE_URL}/staff`);
    // if (!response.ok) {
    //   throw new Error(`API request failed with status ${response.status}`);
    // }
    // const result: StaffApiResponse = await response.json();
    // if (result.error) {
    //   throw new Error('API returned an error for staff list');
    // }
    // return result.data;

    // Using placeholder data until API is confirmed
    console.warn("Using placeholder staff data. Implement API call to /staff.");
    return [
      {
        id: 1,
        user_id: 101,
        User: {
          id: 101,
          username: 'Alice Wonderland',
          ProfilePhoto: { id: 1, path: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Alice' }
        },
        Departments: [
          {
            department_id: 1,
            Department: { id: 1, name: 'Community Management' },
            JobTitles: [{ id: 1, name: 'Head Manager' }, { id: 2, name: 'Event Organizer' }]
          },
          {
            department_id: 2,
            Department: { id: 2, name: 'Technical Operations' },
            JobTitles: [{ id: 3, name: 'System Administrator' }]
          }
        ]
      },
      {
        id: 2,
        user_id: 102,
        User: {
          id: 102,
          username: 'Bob The Builder',
          // No profile photo
        },
        Departments: [
          {
            department_id: 3,
            Department: { id: 3, name: 'Content Creation' },
            JobTitles: [{ id: 4, name: 'Lead Videographer' }]
          }
        ]
      }
    ];
  } catch (error) {
    console.error('Failed to fetch staff list:', error);
    // In a real app, you might want to return an empty array or re-throw
    // to be handled by the UI component.
    return []; // Return empty array on error for now
  }
};
