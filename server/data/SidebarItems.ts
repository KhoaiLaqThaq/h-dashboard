export const sidebarItems = {
    items: [
      {
        to: "/",
        title: "label.sidebar.home",
        label: "label.sidebar.home",
        iconData: "fa-solid fa-house"
      },
      {
        to: null,
        title: "label.sidebar.system",
        label: "label.sidebar.system",
        id: "submenu1",
        iconData: "fa-solid fa-network-wired",
        children: [
          {
            to: "/system/group",
            title: "label.sidebar.userGroup",
            label: "label.sidebar.userGroup",
            iconData: "fa-solid fa-user-group"
          },
          {
            to: "/system/user",
            title: "label.sidebar.user",
            label: "label.sidebar.user",
            iconData: "fa-solid fa-user"
          },
          {
            to: "/system/systemParams",
            title: "label.sidebar.parameter",
            label: "label.sidebar.parameter",
            iconData: "fa-solid fa-gamepad"
          }
        ]
      },
      {
        to: null,
        title: "label.sidebar.common",
        label: "label.sidebar.common",
        id: "submenu2",
        iconData: "fa-solid fa-globe",
        children: [
          {
            to: "/common/department",
            title: "label.sidebar.department",
            label: "label.sidebar.department",
            iconData: "fa-solid fa-users-rectangle"
          },
          {
            to: "/common/topic",
            title: "label.sidebar.topic",
            label: "label.sidebar.topic",
            iconData: "fa-solid fa-book"
          },
          {
            to: "/common/newsType",
            title: "label.sidebar.newsType",
            label: "label.sidebar.newsType",
            iconData: "fa-solid fa-icons"
          },
          {
            to: "/common/comment",
            title: "label.sidebar.comment",
            label: "label.sidebar.comment",
            iconData: "fa-solid fa-comments"
          }
        ]
      },
      {
        to: "/news",
        title: "label.sidebar.news",
        label: "label.sidebar.news",
        iconData: "fa-solid fa-newspaper"
      },
      {
        to: "/others",
        title: "label.sidebar.others",
        label: "label.sidebar.others",
        iconData: "fa-solid fa-wand-sparkles"
      }
    ]
  }