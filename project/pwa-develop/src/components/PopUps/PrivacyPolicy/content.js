export default {
  COLUMNS: [
    {
      title: "Allow",
      dataIndex: "allow",
      key: "allow",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Tools",
      dataIndex: "tools",
      key: "tools",
    },
  ],
  DATA: [
    {
      key: 1,
      category: "Functional",
      purpose:
        "To monitor the performance of our site and to enhance your browsing experience. For example, these tools enable you to communicate with us via live chat.",
      tools: "Crisp, Sentry",
    },
    {
      key: 2,
      category: "Marketing & Analytics",
      purpose:
        "To understand user behavior in order to provide you with a more relevant browsing experience or personalize the content on our site. For example, we collect information about which pages you visit to help us present more relevant information.",
      tools: "Google Analytics",
    },
    {
      key: 3,
      category: "Advertising",
      purpose:
        "To personalize and measure the effectiveness of advertising on our site and other websites. For example, we may serve you a personalized ad based on the pages you visit on our site.",
      tools: "Facebook Pixel, Twitter Ads",
    },
    {
      key: 4,
      allow: "N/A",
      category: "Essential",
      purpose:
        "We use browser cookies that are necessary for the site to work as intended. For example, we store your website data collection preferences so we can honor them if you return to our site. You can disable these cookies in your browser settings but if you do the site may not work as intended.",
      tools: "",
    },
  ],
};
