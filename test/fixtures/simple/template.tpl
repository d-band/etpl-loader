<p><%=name%></p>
<p><%-code%></p>
<%for(var i=0;i<10;i++) {%>
<span><%=i%></span>
<%}%>
<%list.forEach(function(item) {console.log(item);%>
  <div><%=item%></div>
<%});%>