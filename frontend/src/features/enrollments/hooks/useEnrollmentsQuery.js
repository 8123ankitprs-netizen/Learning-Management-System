import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../config/axios';

// Fetch all enrollments for logged-in student
export const useEnrollmentsQuery = (options = {}) => {
  return useQuery({
    queryKey: ['enrollments'],
    queryFn: async () => {
      const response = await api.get('/enrollments');
      return response.data.data;
    },
    ...options
  });
};

// Mutation to enroll in a course
export const useEnrollMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (courseId) => {
      const response = await api.post('/enrollments', { courseId });
      return response.data.data;
    },
    onSuccess: () => {
      // Invalidate enrollments list cache to force refresh of student dashboard
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });
};

// Fetch student progress for a course
export const useProgressQuery = (enrollmentId) => {
  return useQuery({
    queryKey: ['progress', enrollmentId],
    queryFn: async () => {
      const response = await api.get(`/enrollments/${enrollmentId}/progress`);
      return response.data.data;
    },
    enabled: !!enrollmentId,
  });
};

// Mutation to update lesson progress
export const useUpdateProgressMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (progressData) => {
      const response = await api.put('/enrollments/progress', progressData);
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });
};

// Mutation to cancel an enrollment
export const useCancelEnrollmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (enrollmentId) => {
      const response = await api.delete(`/enrollments/${enrollmentId}`);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });
};
