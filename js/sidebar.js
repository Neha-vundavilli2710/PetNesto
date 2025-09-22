function closeSidebar() {
                document.getElementById("sidebar").style.left = "-400px";
            }

            function openSidebar() {
                document.getElementById("sidebar").style.left = "0px";
            }

            function redirectToPage(checkbox, page) {
                if (checkbox.checked) {
                    window.location.href = page;
               }
}