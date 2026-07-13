import { useQuery } from '@tanstack/react-query';
import api from '../../../config/axios';

// Fetch all courses
export const useCoursesQuery = (filters = {}) => {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: async () => {
      const response = await api.get('/courses', { params: filters });
      return response.data.data;
    },
  });
};

// Fetch single course details by ID
export const useCourseDetailsQuery = (id) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const response = await api.get(`/courses/${id}`);
      return response.data.data;
    },
    enabled: !!id, // Only run query if id is provided
  });
};

// Fetch all categories
export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/categories');
      return response.data.data;
    },
  });
};
