class Entry {
  constructor(place, title, from, to, description) {
    this.place = place;
    this.title = title;
    this.from = from;
    this.to = to;
    this.description = description;
  }
}

const placeholderProfile = {
  user: {
    name: "John Doe",
    title: "Web Developer",
    email: "john@website.com",
    phone: "555-555-5555",
    website: "www.theodinproject.com",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  experience: [
    new Entry('Tech Studios', 'Front-End Developer', '2030', 'Present', 'Built and maintained responsive web interfaces using React and Tailwind CSS.'),
    new Entry('Light Solutions', 'Web Developer Intern', '2025', '2030', 'Developed custom WordPress themes and landing pages for client websites.')
  ],
  education: [
    new Entry('University of California, Berkeley', 'Bachelor of Science in Computer Science', '2027', '2031'),
  ]
}

export { placeholderProfile };