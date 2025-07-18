export const mockUsers = [
  {
    id: "1",
    name: "Ahmad Hassan",
    email: "ahmad@example.com",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop&crop=face",
    totalReports: 12,
    lastReportDate: "2024-01-15",
    status: "active",
    joinedDate: "2023-08-15",
  },
  {
    id: "2",
    name: "Fatima Ali",
    email: "fatima@example.com",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face",
    totalReports: 8,
    lastReportDate: "2024-01-12",
    status: "active",
    joinedDate: "2023-09-10",
  },
  {
    id: "3",
    name: "Muhammad Khan",
    email: "muhammad@example.com",
    avatar:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=100&h=100&fit=crop&crop=face",
    totalReports: 15,
    lastReportDate: "2024-01-10",
    status: "pending",
    joinedDate: "2023-07-20",
  },
  {
    id: "4",
    name: "Aisha Malik",
    email: "aisha@example.com",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=face",
    totalReports: 6,
    lastReportDate: "2024-01-08",
    status: "active",
    joinedDate: "2023-10-05",
  },
  {
    id: "5",
    name: "Omar Sheikh",
    email: "omar@example.com",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=100&h=100&fit=crop&crop=face",
    totalReports: 20,
    lastReportDate: "2024-01-14",
    status: "active",
    joinedDate: "2023-06-12",
  },
  {
    id: "6",
    name: "Zara Ahmed",
    email: "zara@example.com",
    avatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=100&h=100&fit=crop&crop=face",
    totalReports: 4,
    lastReportDate: "2024-01-05",
    status: "inactive",
    joinedDate: "2023-11-18",
  },
];

export const mockReports = [
  // Ahmad Hassan's Reports
  {
    id: "1",
    userId: "1",
    title: "Weekly Progress Update",
    description:
      "Lost 2kg this week, feeling great with the new workout routine. My energy levels have improved significantly and I can now complete the full cardio session without breaks.",
    type: "progress",
    priority: "medium",
    status: "new",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    userId: "1",
    title: "Nutrition Plan Feedback",
    description:
      "The meal plan is working well, but I need more variety in breakfast options. Current meals are getting repetitive after 3 weeks.",
    type: "nutrition",
    priority: "low",
    status: "reviewed",
    createdAt: "2024-01-12T14:20:00Z",
  },
  {
    id: "3",
    userId: "1",
    title: "Workout Intensity Issue",
    description:
      "The current workout seems too easy now. I think I need to move to the next level or increase weights.",
    type: "fitness",
    priority: "medium",
    status: "resolved",
    createdAt: "2024-01-08T09:15:00Z",
  },
  {
    id: "4",
    userId: "1",
    title: "Sleep Pattern Improvement",
    description:
      "Following the recommended sleep schedule has improved my recovery time significantly. Feeling more energetic during workouts.",
    type: "progress",
    priority: "low",
    status: "reviewed",
    createdAt: "2024-01-05T18:30:00Z",
  },

  // Fatima Ali's Reports
  {
    id: "5",
    userId: "2",
    title: "App Bug Report",
    description:
      "The workout timer keeps resetting randomly during exercises. This happens especially during high-intensity intervals.",
    type: "issue",
    priority: "high",
    status: "new",
    createdAt: "2024-01-12T09:15:00Z",
  },
  {
    id: "6",
    userId: "2",
    title: "Diet Plan Success",
    description:
      "The vegetarian meal plan has been perfect for my lifestyle. Lost 3kg in 2 weeks while maintaining energy levels.",
    type: "nutrition",
    priority: "medium",
    status: "reviewed",
    createdAt: "2024-01-09T16:45:00Z",
  },
  {
    id: "7",
    userId: "2",
    title: "Yoga Session Feedback",
    description:
      "The morning yoga sessions are helping with flexibility and stress management. Would like more advanced poses.",
    type: "fitness",
    priority: "low",
    status: "resolved",
    createdAt: "2024-01-06T07:30:00Z",
  },

  // Muhammad Khan's Reports
  {
    id: "8",
    userId: "3",
    title: "Monthly Fitness Assessment",
    description:
      "Completed all fitness goals for the month. Ready for next level challenges. Strength has increased by 25%.",
    type: "fitness",
    priority: "medium",
    status: "resolved",
    createdAt: "2024-01-10T16:45:00Z",
  },
  {
    id: "9",
    userId: "3",
    title: "Protein Intake Concern",
    description:
      "Having difficulty meeting daily protein requirements with current meal plan. Need suggestions for protein-rich snacks.",
    type: "nutrition",
    priority: "high",
    status: "new",
    createdAt: "2024-01-07T12:20:00Z",
  },
  {
    id: "10",
    userId: "3",
    title: "Cardio Performance",
    description:
      "Running endurance has improved dramatically. Can now complete 5K in under 25 minutes consistently.",
    type: "progress",
    priority: "medium",
    status: "reviewed",
    createdAt: "2024-01-04T19:15:00Z",
  },

  // Aisha Malik's Reports
  {
    id: "11",
    userId: "4",
    title: "Weight Loss Milestone",
    description:
      "Reached my first weight loss goal! Lost 5kg in 6 weeks. The combination of diet and exercise is working perfectly.",
    type: "progress",
    priority: "medium",
    status: "reviewed",
    createdAt: "2024-01-08T14:30:00Z",
  },
  {
    id: "12",
    userId: "4",
    title: "Meal Prep Suggestions",
    description:
      "Need help with meal prep ideas for busy weekdays. Current plan is hard to follow with my work schedule.",
    type: "nutrition",
    priority: "medium",
    status: "new",
    createdAt: "2024-01-05T11:45:00Z",
  },

  // Omar Sheikh's Reports
  {
    id: "13",
    userId: "5",
    title: "Strength Training Progress",
    description:
      "Bench press has increased from 60kg to 80kg in 2 months. The progressive overload program is working excellently.",
    type: "fitness",
    priority: "low",
    status: "resolved",
    createdAt: "2024-01-14T15:20:00Z",
  },
  {
    id: "14",
    userId: "5",
    title: "Recovery Time Issue",
    description:
      "Feeling more sore than usual after workouts. Might need to adjust rest days or reduce intensity temporarily.",
    type: "issue",
    priority: "high",
    status: "new",
    createdAt: "2024-01-11T08:30:00Z",
  },
  {
    id: "15",
    userId: "5",
    title: "Supplement Consultation",
    description:
      "Interested in adding creatine and whey protein to my routine. Need guidance on timing and dosage.",
    type: "nutrition",
    priority: "medium",
    status: "reviewed",
    createdAt: "2024-01-08T13:15:00Z",
  },

  // Zara Ahmed's Reports
  {
    id: "16",
    userId: "6",
    title: "Beginner Workout Feedback",
    description:
      "The beginner program is perfect for getting back into fitness after a long break. Feeling stronger each week.",
    type: "fitness",
    priority: "low",
    status: "reviewed",
    createdAt: "2024-01-05T10:45:00Z",
  },
  {
    id: "17",
    userId: "6",
    title: "Hydration Tracking",
    description:
      "Started tracking water intake as suggested. Already noticing improvements in energy and skin health.",
    type: "progress",
    priority: "low",
    status: "resolved",
    createdAt: "2024-01-02T16:20:00Z",
  },
];
