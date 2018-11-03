<p><%=name%></p>
<p><%=email%></p>
<ul>
  <%for (var i=0; i<skills.length; i++) {var skill = skills[i];%>
  <li><%-skill%></li>
  <%}%>
</ul>
<div>
  <%projects.forEach((project) => {%>
  <div>
    <h3><%-project.name%></h3>
    <p><%=project.description%></p>
  </div>
  <%});%>
</div>
<%include('footer.tpl')%>