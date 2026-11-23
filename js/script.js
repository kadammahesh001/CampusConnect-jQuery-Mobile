/* CampusConnect - script.js. Sections: 1 init, 2 data, 3 render, 4 popups, 5 filters, 6 forms, 7 storage, 8 utils */
(function ($) {
  "use strict";
  var KEY = "campusconnect_feedbacks";
  var currentSubject = "ds";

  /* ---- 8. Utilities ---- */
  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function stars(n) { return new Array(Math.max(0, +n || 0) + 1).join("\u2605"); }
  function find(list, id) { for (var i = 0; i < list.length; i++) { if (String(list[i].id) === String(id)) { return list[i]; } } return null; }
  function initials(name) { return name.replace(/^Dr\.\s*/, "").split(" ").slice(0, 2).map(function (w) { return w.charAt(0); }).join(""); }

  /* ---- 2. Sample data (all demonstration records) ---- */
  function S(title, code, cr, desc, units, outcomes, asg) {
    return { title: title, code: code, credits: cr, desc: desc, units: units.split("|"), outcomes: outcomes.split("|"), assignments: asg.split("|") };
  }
  var SUBJECTS = {
    ds: S("Data Structures", "DS201", 4, "Organising data efficiently with arrays, lists, trees and graphs.", "Arrays and Linked Lists|Stacks and Queues|Trees and Heaps|Graphs, Sorting and Hashing", "Choose a suitable structure for a problem|Analyse time and space complexity", "Implement a linked list|Compare sorting algorithms on sample data"),
    dbms: S("Database Management Systems", "DB202", 4, "Relational modelling, SQL and transaction management.", "ER Modelling|Relational Algebra and SQL|Normalisation|Transactions and Concurrency", "Design normalised schemas|Write non-trivial SQL queries", "Design an ER diagram for a library|Write 15 SQL queries"),
    wt: S("Web Technology", "WT203", 3, "Building responsive client-side web applications.", "HTML5 and CSS3|JavaScript and DOM|jQuery and jQuery Mobile|Web Storage and Forms", "Build responsive pages|Validate forms and persist data in the browser", "Create a mobile site with jQuery Mobile|Build a LocalStorage feedback form"),
    jp: S("Java Programming", "JP204", 4, "Object-oriented programming with Java.", "Classes and Objects|Inheritance and Interfaces|Exceptions and Collections|Multithreading and I/O", "Apply OOP principles|Handle exceptions and use collections", "Bank account class hierarchy|Multithreaded file reader"),
    cn: S("Computer Networks", "CN205", 3, "Layered network architecture and protocols.", "OSI and TCP/IP Models|Data Link and Network Layer|Transport Layer|Application Layer Protocols", "Explain protocol layering|Analyse packet flow and addressing", "Subnetting worksheet|Capture and analyse HTTP traffic"),
    dw: S("Data Warehousing", "DW206", 3, "Warehouse design, ETL and analytical processing.", "Warehouse Concepts|Dimensional Modelling|ETL Processes|OLAP and Reporting", "Design a star schema|Describe ETL pipeline stages", "Star schema for retail sales|ETL flow diagram"),
    os: S("Operating Systems", "OS207", 4, "Process, memory and file management in operating systems.", "Processes and Threads|CPU Scheduling|Memory Management|File Systems and Deadlocks", "Compare scheduling algorithms|Explain paging and deadlock handling", "Simulate Round Robin scheduling|Page replacement exercise")
  };
  var SUBJECT_ORDER = ["ds", "dbms", "wt", "jp", "cn", "dw", "os"];
  var PRI = { high: "High priority", medium: "Medium priority", normal: "Normal priority" };
  var NOTICES = [
    { id: 1, title: "Internal Examination Schedule", cat: "Examination", date: "2026-03-02", pri: "high", desc: "Sample notice: internal examinations begin next month. Check the timetable and carry your ID card to every paper." },
    { id: 2, title: "Assignment Submission Deadline", cat: "Academic", date: "2026-02-26", pri: "high", desc: "Sample notice: Assignment 6 (jQuery Mobile) must be submitted to the laboratory incharge before the deadline." },
    { id: 3, title: "Technical Workshop on Web Development", cat: "Workshop", date: "2026-02-24", pri: "medium", desc: "Sample notice: a hands-on workshop on responsive web development is open to Data Science students." },
    { id: 4, title: "Department Notice: Lab Timings", cat: "Department", date: "2026-02-20", pri: "normal", desc: "Sample notice: laboratory batches have revised timings this week. Follow the updated batch list." },
    { id: 5, title: "Project Review Round", cat: "Project", date: "2026-02-18", pri: "medium", desc: "Sample notice: mini-project review presentations will be held in the seminar hall. Prepare a five minute demo." },
    { id: 6, title: "Academic Registration Reminder", cat: "Registration", date: "2026-02-12", pri: "normal", desc: "Sample notice: complete your academic registration for the next term before the window closes." }
  ];
  var EVENTS = [
    { id: 1, name: "jQuery Mobile Bootcamp", date: "2026-03-05", time: "10:00 AM", venue: "Lab 3", cat: "Workshop", desc: "Build a multi-page mobile site from scratch." },
    { id: 2, name: "Python Data Workshop", date: "2026-03-09", time: "2:00 PM", venue: "Seminar Hall", cat: "Workshop", desc: "Data cleaning and plotting with Python." },
    { id: 3, name: "CodeSprint", date: "2026-03-12", time: "9:30 AM", venue: "Lab 1", cat: "Coding", desc: "Three hour individual coding contest." },
    { id: 4, name: "Hack the Campus", date: "2026-03-20", time: "9:00 AM", venue: "Innovation Centre", cat: "Coding", desc: "Team hackathon on campus problems." },
    { id: 5, name: "Cultural Evening", date: "2026-03-25", time: "5:30 PM", venue: "Open Air Theatre", cat: "Cultural", desc: "Music, dance and drama by student clubs." },
    { id: 6, name: "Rangoli and Art Fest", date: "2026-03-27", time: "11:00 AM", venue: "Main Lobby", cat: "Cultural", desc: "Open art and rangoli competition." },
    { id: 7, name: "Data Science Symposium", date: "2026-04-03", time: "10:00 AM", venue: "Auditorium", cat: "Symposium", desc: "Student paper presentations on data science." },
    { id: 8, name: "Emerging Tech Symposium", date: "2026-04-10", time: "11:30 AM", venue: "Conference Room", cat: "Symposium", desc: "Talks on AI, cloud and web trends." }
  ];
  var FACULTY = [
    { id: 1, name: "Dr. Asha Verma", dept: "Data Science", role: "Professor", spec: "Data Warehousing", email: "asha.verma@example.edu" },
    { id: 2, name: "Prof. Rohan Patil", dept: "Data Science", role: "Associate Professor", spec: "Web Technology", email: "rohan.patil@example.edu" },
    { id: 3, name: "Dr. Neha Kulkarni", dept: "Computer Engineering", role: "Assistant Professor", spec: "Database Systems", email: "neha.kulkarni@example.edu" },
    { id: 4, name: "Prof. Sameer Joshi", dept: "Data Science", role: "Assistant Professor", spec: "Java Programming", email: "sameer.joshi@example.edu" },
    { id: 5, name: "Dr. Priya Deshmukh", dept: "Information Technology", role: "Professor", spec: "Computer Networks", email: "priya.deshmukh@example.edu" },
    { id: 6, name: "Prof. Karan Mehta", dept: "Data Science", role: "Lecturer", spec: "Operating Systems", email: "karan.mehta@example.edu" }
  ];

  /* ---- 3. Rendering (runs once per page, before jQM enhancement) ---- */
  function eventCard(e, withBtn) {
    return '<div class="cc-card cc-event" data-cat="' + esc(e.cat) + '"><span class="cc-badge cc-pri-ok">' + esc(e.cat) + '</span><h3>' + esc(e.name) + '</h3><p class="cc-meta">' + esc(e.date) + ', ' + esc(e.time) + ', ' + esc(e.venue) + '</p><p>' + esc(e.desc) + '</p>' +
      (withBtn ? '<a href="#popupRegister" data-rel="popup" data-position-to="window" data-eid="' + e.id + '" class="ui-btn ui-btn-inline ui-mini ui-corner-all">Register</a>' : "") + '</div>';
  }
  function noticeCard(a, withBtn) {
    return '<div class="cc-card"><span class="cc-badge cc-pri-' + a.pri + '">' + PRI[a.pri] + '</span> <span class="cc-meta">' + esc(a.cat) + ' | ' + esc(a.date) + '</span><h3>' + esc(a.title) + '</h3><p>' + esc(a.desc.substr(0, 80)) + '...</p>' +
      '<a href="#popupAnnouncement" data-rel="popup" data-position-to="window" data-aid="' + a.id + '" class="ui-btn ui-btn-inline ui-mini ui-corner-all">Read more</a></div>';
  }
  $(document).on("pagebeforecreate", "#home", function () {
    $("#homeEvents").html(EVENTS.slice(0, 2).map(function (e) { return eventCard(e, false); }).join(""));
    $("#homeNotices").html(NOTICES.slice(0, 2).map(function (a) { return noticeCard(a); }).join(""));
  });
  $(document).on("pagebeforecreate", "#announcements", function () { $("#announceList").html(NOTICES.map(noticeCard).join("")); });
  $(document).on("pagebeforecreate", "#events", function () { $("#eventList").html(EVENTS.map(function (e) { return eventCard(e, true); }).join("")); });
  $(document).on("pagebeforecreate", "#subjects", function () {
    $("#subjectList").html(SUBJECT_ORDER.map(function (id) {
      var s = SUBJECTS[id];
      return '<li><a href="#subject-details" data-subject-id="' + id + '"><h3>' + esc(s.title) + '</h3><p><strong>' + esc(s.code) + ' | ' + s.credits + ' credits</strong></p><p>' + esc(s.desc) + '</p><p><em>View syllabus</em></p></a></li>';
    }).join(""));
  });
  $(document).on("pagebeforecreate", "#faculty", function () {
    $("#facultyList").html(FACULTY.map(function (f) {
      return '<li><a href="#popupFaculty" data-rel="popup" data-position-to="window" data-fid="' + f.id + '"><span class="cc-avatar">' + esc(initials(f.name)) + '</span><h3>' + esc(f.name) + '</h3><p>' + esc(f.role) + ', ' + esc(f.dept) + '</p><p>' + esc(f.spec) + ' | ' + esc(f.email) + '</p></a></li>';
    }).join(""));
  });
  $(document).on("pagebeforecreate", "#feedback", renderFeedbackHistory);

  function renderSubject() {
    var s = SUBJECTS[currentSubject];
    if (!s) { return; }
    var li = function (a) { return a.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join(""); };
    $("#detailTitle").text(s.title);
    $("#detailCode").text(s.code);
    $("#detailCredits").text(s.credits + " credits");
    $("#detailDesc").text(s.desc);
    $("#detailUnitsList").html(li(s.units));
    $("#detailOutcomes").html(li(s.outcomes));
    $("#detailAssignments").html(li(s.assignments));
  }
  $(document).on("pagebeforeshow", "#subject-details", renderSubject);

  /* ---- 4. Popups and delegated clicks (bound once on document) ---- */
  $(document).on("click", "[data-subject-id]", function () { currentSubject = $(this).attr("data-subject-id"); });
  $(document).on("click", "[data-aid]", function () {
    var a = find(NOTICES, $(this).attr("data-aid"));
    if (!a) { return; }
    $("#annTitle").text(a.title);
    $("#annMeta").text(PRI[a.pri] + " | " + a.cat + " | " + a.date);
    $("#annDesc").text(a.desc);
  });
  $(document).on("click", "[data-eid]", function () {
    var e = find(EVENTS, $(this).attr("data-eid"));
    if (e) { $("#regText").text("Demo registration for \u201C" + e.name + "\u201D on " + e.date + "."); }
  });
  $(document).on("click", "[data-fid]", function () {
    var f = find(FACULTY, $(this).attr("data-fid"));
    if (!f) { return; }
    $("#facName").text(f.name);
    $("#facInfo").text(f.role + ", " + f.dept + ". Specialization: " + f.spec + ". Email (demo): " + f.email);
    $("#facultyInquiry").val("");
    $("#facultyNote").text("");
  });
  $(document).on("click", "#facultySend", function () {
    $("#facultyNote").text($.trim($("#facultyInquiry").val()).length ? "Demo only: your inquiry was not sent anywhere." : "Please type a question first.");
  });

  /* ---- 5. Filtering ---- */
  $(document).on("click", "#eventFilters a", function (ev) {
    ev.preventDefault();
    var cat = $(this).attr("data-cat");
    $("#eventFilters a").removeClass("ui-btn-active");
    $(this).addClass("ui-btn-active");
    $(".cc-event").each(function () {
      var $c = $(this);
      if (cat === "All" || $c.attr("data-cat") === cat) { $c.stop(true, true).fadeIn(250); } else { $c.stop(true, true).fadeOut(200); }
    });
  });
  // Empty state for filterable listviews (subjects, faculty)
  $(document).on("filterablefilter", "[data-filter='true']", function () {
    var shown = $(this).children("li:not(.ui-screen-hidden)").length;
    $($(this).attr("data-empty")).toggle(shown === 0);
  });

  /* ---- 6. Form validation ---- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function validateAndSubmitFeedback() {
    var v = {
      name: $.trim($("#fbName").val()), email: $.trim($("#fbEmail").val()), department: $("#fbDepartment").val(),
      year: $("input[name=fbYear]:checked").val(), rating: $("input[name=fbRating]:checked").val(),
      category: $("#fbCategory").val(), comments: $.trim($("#fbComments").val()), updates: $("#fbUpdates").is(":checked")
    };
    var errors = [];
    $("#feedbackForm .cc-field").removeClass("cc-invalid");
    function bad(sel, msg) { errors.push(msg); $(sel).closest(".cc-field").addClass("cc-invalid"); }
    if (!v.name) { bad("#fbName", "Name is required."); } else if (v.name.length < 2) { bad("#fbName", "Name must be at least 2 characters."); }
    if (!v.email) { bad("#fbEmail", "Email is required."); } else if (!EMAIL_RE.test(v.email)) { bad("#fbEmail", "Enter a valid email address."); }
    if (!v.department) { bad("#fbDepartment", "Select a department."); }
    if (!v.year) { bad("input[name=fbYear]:first", "Select an academic year."); }
    if (!v.rating) { bad("input[name=fbRating]:first", "Select a rating."); }
    if (!v.category) { bad("#fbCategory", "Select a feedback category."); }
    if (v.comments.length < 5) { bad("#fbComments", "Comments must be at least 5 characters."); }
    if (errors.length) {
      $("#feedbackErrorList").html(errors.map(function (m) { return "<li>" + esc(m) + "</li>"; }).join(""));
      $("#feedbackErrorBox").show();
      $.mobile.silentScroll(0);
      return false;
    }
    $("#feedbackErrorBox").hide();
    var entry = { id: "fb_" + Date.now() + "_" + Math.floor(Math.random() * 1e6), name: v.name, email: v.email, department: v.department, year: v.year, rating: v.rating, category: v.category, comments: v.comments, updates: v.updates, createdAt: new Date().toISOString() };
    if (!saveFeedbackToStorage(entry)) {
      $("#feedbackErrorList").html("<li>Could not save: browser storage is unavailable.</li>");
      $("#feedbackErrorBox").show();
      return false;
    }
    $("#feedbackForm")[0].reset();
    $("#feedbackForm input[type=radio], #feedbackForm input[type=checkbox]").checkboxradio("refresh");
    $("#feedbackForm select").selectmenu("refresh");
    renderFeedbackHistory();
    $("#popupFeedbackSuccess").popup("open");
    return true;
  }
  $(document).on("submit", "#feedbackForm", function (e) { e.preventDefault(); validateAndSubmitFeedback(); });
  $(document).on("submit", "#contactForm", function (e) { e.preventDefault(); $("#popupContact").popup("open"); });

  /* ---- 7. LocalStorage ---- */
  function loadSavedFeedbacksFromStorage() {
    try {
      var raw = window.localStorage.getItem(KEY);
      var data = raw ? JSON.parse(raw) : [];
      return $.isArray(data) ? data : [];
    } catch (err) { return []; } // invalid JSON or storage blocked
  }
  function saveFeedbackToStorage(entry) {
    try {
      var list = loadSavedFeedbacksFromStorage();
      list.unshift(entry);
      window.localStorage.setItem(KEY, JSON.stringify(list));
      return true;
    } catch (err) { return false; }
  }
  function renderFeedbackHistory() {
    var list = loadSavedFeedbacksFromStorage();
    if (!list.length) { $("#feedbackHistory").html('<div class="cc-empty" style="display:block">No feedback saved yet. Submit the form above to see it here.</div>'); return; }
    $("#feedbackHistory").html(list.map(function (f) {
      return '<div class="cc-card cc-feedback-item"><strong>' + esc(f.name) + '</strong><p class="cc-meta">' + esc(f.department) + ' | Year ' + esc(f.year) + ' | ' + esc(f.category) + '</p><p>' + esc(stars(f.rating)) + '</p><p>' + esc(f.comments) + '</p><p class="cc-meta">' + esc(new Date(f.createdAt).toLocaleString()) + '</p></div>';
    }).join(""));
  }
  window.CampusConnect = { validateAndSubmitFeedback: validateAndSubmitFeedback, saveFeedbackToStorage: saveFeedbackToStorage, loadSavedFeedbacksFromStorage: loadSavedFeedbacksFromStorage, escapeHtml: esc };
})(jQuery);
