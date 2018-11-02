<p><%=name%></p>
<p><%-code%></p>
<%for(var i=0;i<10;i++) {%>
<span><%=i%></span>
<%}%>
<%list.forEach(function(item) {%>
  <div><%=item%></div>
<%});%>
<%include()%>