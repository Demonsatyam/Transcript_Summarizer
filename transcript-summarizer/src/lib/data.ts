
export type Transcript = {
  id: string;
  title: string;
  createdAt: string;
  summary: string;
  transcript: string;
  versions?: { summary: string, createdAt: string }[];
  userId: string;
};

export const MOCK_TRANSCRIPTS: Transcript[] = [
  {
    id: '1',
    title: 'Project Kick-off Meeting',
    createdAt: new Date('2023-10-26T10:00:00Z').toISOString(),
    summary: 'The team discussed the main goals for the new project, codenamed "Phoenix". Key stakeholders were identified, and a preliminary timeline was established. Alice is responsible for the design mockups, and Bob will handle the backend architecture. The next meeting is scheduled for next Tuesday.',
    transcript: 'Okay, team, let\'s kick off project Phoenix. Our main goal is to launch by the end of Q4. Who are the key stakeholders? We have Marketing, Sales, and of course, our end-users. For the timeline, let\'s aim for a beta in November. Alice, can you take the lead on design? Bob, you\'ll be in charge of the backend. Let\'s sync up again next Tuesday.',
    versions: [
      { summary: 'Initial summary about project Phoenix goals and team roles.', createdAt: new Date('2023-10-26T10:05:00Z').toISOString() },
      { summary: 'A summary focusing on the timeline and key deliverables for project Phoenix.', createdAt: new Date('2023-10-26T11:00:00Z').toISOString() },
    ],
    userId: '1',
  },
  {
    id: '2',
    title: 'Weekly Stand-up',
    createdAt: new Date('2023-10-24T09:00:00Z').toISOString(),
    summary: 'The team provided updates on their progress. Charlie fixed the authentication bug. David is still working on the API integration and is facing some challenges with the third-party documentation. The team agreed to swarm on the API issue to help David.',
    transcript: 'Alright, quick stand-up. Charlie, any updates? Yes, I deployed the fix for the auth bug this morning. Great. David? I\'m still working on the API integration. The documentation is a bit sparse. Okay, let\'s have a few people jump in to help David after this call.',
    userId: '1',
  },
  {
    id: '3',
    title: 'User Interview with Acme Corp',
    createdAt: new Date('2023-10-22T14:30:00Z').toISOString(),
    summary: 'Interviewed Jane from Acme Corp. She expressed frustration with the current reporting features, finding them too rigid. She would like to see more customizable dashboards and the ability to export data in CSV format. She also mentioned that the onboarding process was a bit confusing.',
    transcript: 'Thanks for joining, Jane. Can you tell me about your experience with our product? Well, the reporting is my main pain point. It\'s very rigid. I\'d love to build my own dashboards. And exporting to CSV is a must-have for us. Also, the initial setup was a little confusing for my team.',
    versions: [],
    userId: '1',
  },
    {
    id: '4',
    title: 'Q3 Financial Review',
    createdAt: new Date('2023-10-20T11:00:00Z').toISOString(),
    summary: 'The finance team presented the Q3 results. Revenue is up 15% year-over-year, exceeding targets. The majority of the growth came from the new enterprise plan. The team discussed allocating more budget to marketing for Q4 to accelerate growth.',
    transcript: 'Good morning, everyone. Let\'s review the Q3 financials. As you can see, we had a strong quarter with revenue up 15% YoY. This was largely driven by the success of our new enterprise plan. We propose increasing the marketing budget for Q4 to build on this momentum.',
    userId: '1',
  },
  {
    id: '5',
    title: 'Design Brainstorming Session',
    createdAt: new Date('2023-10-18T16:00:00Z').toISOString(),
    summary: 'The design team held a brainstorming session for the new mobile app interface. Three main concepts were sketched out. The team favored a minimalist design with a bottom navigation bar. Next steps are to create higher-fidelity mockups for user testing.',
    transcript: 'Okay, let\'s throw some ideas on the whiteboard for the new mobile UI. What if we tried a card-based layout? Or maybe a more traditional list view? I like the idea of a clean, minimalist design with a simple nav bar at the bottom. Okay, let\'s work on some mockups based on that concept.',
    versions: [
      { summary: 'Summary of the design brainstorming session and the favored minimalist concept.', createdAt: new Date('2023-10-18T16:30:00Z').toISOString() },
    ],
    userId: '1',
  },
];
