document.addEventListener('DOMContentLoaded', function () {
  // Desktop
  const bellIcon = document.getElementById('notificationBell');
  const dropdown = document.getElementById('notificationDropdown');

  if (bellIcon && dropdown) {
    bellIcon.addEventListener('click', function () {
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', function (event) {
      if (!bellIcon.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
      }
    });
  }

  // Mobile
  const mobileBell = document.getElementById('mobileNotificationBell');
  const mobileDropdown = document.getElementById('mobileNotificationDropdown');

  if (mobileBell && mobileDropdown) {
    mobileBell.addEventListener('click', function () {
      mobileDropdown.style.display = mobileDropdown.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', function (event) {
      if (!mobileBell.contains(event.target) && !mobileDropdown.contains(event.target)) {
        mobileDropdown.style.display = 'none';
      }
    });
  }

  // Sidebar
  const sidebarNotification = document.getElementById('sidebarNotification');

  if (sidebarNotification && mobileDropdown) {
    sidebarNotification.addEventListener('click', function () {
      mobileDropdown.style.display = mobileDropdown.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', function (event) {
      if (!sidebarNotification.contains(event.target) && !mobileDropdown.contains(event.target)) {
        mobileDropdown.style.display = 'none';
      }
    });
  }
});
