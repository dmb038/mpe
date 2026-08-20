export type NavLink = { label: string; href: string };
export type NavItem = { label: string; href?: string; children?: NavLink[] };

export const marketingNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "History", href: "/about/history" },
      { label: "Location", href: "/about/location" },
    ],
  },
  { label: "Calendar", href: "/calendar" },
  {
    label: "Info",
    children: [
      { label: "Schools", href: "/info/schools" },
      { label: "Preschools", href: "/info/preschools" },
      { label: "Amenities", href: "/info/amenities" },
      { label: "Clubs", href: "/info/clubs" },
      { label: "Trash & Recycling", href: "/info/trash" },
      { label: "Security", href: "/info/security" },
      { label: "Facebook Group Rules", href: "/info/facebook-rules" },
      { label: "Links", href: "/info/links" },
      { label: "Dues", href: "/info/dues" },
    ],
  },
  {
    label: "Contacts",
    children: [
      { label: "Association Board", href: "/contacts/board" },
      { label: "Other Contacts", href: "/contacts/other" },
      { label: "Security Taskforce", href: "/contacts/security-taskforce" },
      { label: "Email Us", href: "/contacts/email-us" },
      { label: "Flock Footage Request", href: "/flock-request" },
    ],
  },
];

export const footerLinks = {
  social: [
    { label: "Facebook Group", href: "https://www.facebook.com/groups/mpedallas/" },
    {
      label: "Nextdoor",
      href: "https://nextdoor.com/neighborhood/merrimanparkestates--dallas--tx/",
    },
  ],
  membershipToolkit: "https://merrimanparkestates.membershiptoolkit.com/",
};
