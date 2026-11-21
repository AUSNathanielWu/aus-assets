<!--
  WildApricot script-loading test  (jsDelivr)
  ---------------------------------------------------------------
  The earlier test showed WildApricot will not let a page FETCH data
  from outside. This tests a different door: loading the data as a
  SCRIPT instead, from jsDelivr, which serves files straight out of
  a GitHub repository.

  We know the script door is partly open, because Leaflet loads on
  the map page from unpkg. The question is whether jsDelivr is also
  allowed.

  Paste this into the same unpublished test page, replacing what is
  there. Nothing to edit.
-->

<div id="ausjd-root">
<style>
  #ausjd-root{font-family:system-ui,-apple-system,Segoe UI,Arial,sans-serif;
    max-width:620px;margin:0 auto;padding:26px 20px;line-height:1.55;color:#16201d;}
  #ausjd-root *{box-sizing:border-box;}
  .ausjd-h{font-size:19px;font-weight:600;margin:0 0 4px;}
  .ausjd-s{font-size:14px;color:#4a5a55;margin:0 0 18px;}
  .ausjd-box{border:1px solid #ddd6c6;border-radius:12px;padding:16px 18px;
    background:#fbf9f3;margin:0 0 12px;}
  .ausjd-box h3{margin:0 0 6px;font-size:15px;font-weight:600;}
  .ausjd-box p{margin:0;font-size:14px;color:#4a5a55;}
  .ausjd-wait{border-left:4px solid #b9b2a2;}
  .ausjd-good{border-left:4px solid #2e7d52;background:#eef6f1;}
  .ausjd-bad {border-left:4px solid #c1593b;background:#f9efec;}
  .ausjd-raw{font-family:ui-monospace,Consolas,monospace;font-size:12px;
    background:#efe9dc;border-radius:8px;padding:10px 12px;margin-top:10px;
    white-space:pre-wrap;word-break:break-all;color:#3a4a45;}
</style>

  <p class="ausjd-h">WildApricot script-loading test</p>
  <p class="ausjd-s">Checking whether this page may load a data file as a script
     from jsDelivr. Temporary test page; it changes nothing.</p>

  <div class="ausjd-box ausjd-wait" id="ausjd-out">
    <h3>Testing&hellip;</h3>
    <p>This should settle within a few seconds.</p>
  </div>

<script>
(function(){
  var SRC = "https://cdn.jsdelivr.net/gh/ausnathanielwu/aus-assets@main/test-data.js";
  var box = document.getElementById("ausjd-out");
  var done = false;

  function show(cls, title, body, raw){
    if (done) return;
    done = true;
    box.className = "ausjd-box " + cls;
    var html = "<h3>" + title + "</h3><p>" + body + "</p>";
    if (raw) html += '<div class="ausjd-raw">' + raw + "</div>";
    box.innerHTML = html;
  }

  function check(){
    if (window.AUS_TEST) {
      show("ausjd-good", "It works",
           "The data loaded as a script from jsDelivr. This is the route we " +
           "can use — the directory can update itself. Send Nathaniel this " +
           "screenshot.",
           JSON.stringify(window.AUS_TEST));
    } else {
      show("ausjd-bad", "Blocked",
           "The script did not load, or loaded but set nothing. jsDelivr is " +
           "not allowed either. Send Nathaniel this screenshot and we will " +
           "use the monthly approach.");
    }
  }

  var s = document.createElement("script");
  s.src = SRC;
  s.onload  = function(){ setTimeout(check, 50); };
  s.onerror = function(){
    show("ausjd-bad", "Blocked",
         "The browser refused to load the script at all. jsDelivr is not on " +
         "WildApricot's allowed list. Send Nathaniel this screenshot.");
  };
  document.getElementById("ausjd-root").appendChild(s);

  // Some blocks are silent, so decide for ourselves after a while.
  setTimeout(check, 7000);
})();
</script>
</div>
