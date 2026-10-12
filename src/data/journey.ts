// Transformation tree — same shape as technophillia's tree.ts (title/style/palette/
// children), text replaced with Mamta Modern material scraped from
// mamtamodernschool.com. Minimal copy by design; school photos/facts not
// provided are explicit placeholders.
export interface Milestone {
  id: string;
  title: string;
  line: string;
  facts: string[];
  photo: { src: string; alt: string; placeholder: boolean };
}

export const meta = {
  wordmark: 'MAMTA MODERN',
  school: 'Mamta Modern Sr. Sec. School · H-Block, Vikas Puri, New Delhi',
};

export const milestones: Milestone[] = [
  {
    id: 'roots',
    title: '1973 · Roots',
    line: 'A humble start in West Delhi.',
    facts: ['Founded 1973 · Mamta Modern Education Society', 'Recognised by Directorate of Education, Delhi'],
    photo: { src: '/photos/1973-placeholder.jpg', alt: 'Placeholder — early school photograph', placeholder: true },
  },
  {
    id: 'cbse',
    title: '1986 · Affiliation',
    line: 'CBSE affiliation. Three streams.',
    facts: ['CBSE affiliated 1986 · No. 2730133', 'Science · Commerce · Humanities'],
    photo: { src: '/photos/campus-placeholder.jpg', alt: 'Placeholder — campus photograph', placeholder: true },
  },
  {
    id: 'jubilee',
    title: 'Golden Jubilee',
    line: 'Board toppers. National Teachers Award.',
    facts: ['Golden Jubilee cohort', 'National Teachers Award · zonal titles'],
    photo: { src: '/photos/jubilee-placeholder.jpg', alt: 'Placeholder — celebration photograph', placeholder: true },
  },
  {
    id: 'agents',
    title: 'Autonomous Agents',
    line: 'From smart boards to AI tutors.',
    facts: ['[Placeholder — AI lab fact]', '[Placeholder — agent classroom fact]'],
    photo: { src: '/photos/future-placeholder.jpg', alt: 'Placeholder — future classroom photograph', placeholder: true },
  },
];
