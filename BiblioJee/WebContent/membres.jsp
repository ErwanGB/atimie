<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<jsp:include page="header.jsp"/>

<c:url var="url" value="/membres" />

<form method="post" action="${url}/save" >
	<input name="firstName" value="${data.firstName}" /><br/>
	<input name="lastName"  value="${data.lastName}"  /><br/>
	<input name="id" value="${data.id}" type="hidden" />
	<input type="submit" value="${ empty data.id ? 'Insert' : 'Update' }" />
</form>

<table>
	<tr>
		<td align="center">update</td>
		<td align="center">delete</td>
		<td align="center">id</td>
		<td>first name</td>
		<td>last name</td>
	</tr>
	<tr>
		<td align="center"><a href="${url}/">${ empty data.id ? '&#x2611;' : '&#x2610;' }</a></td>
		<td align="center"></td>
		<td align="center"><a href="${url}/">new</a></td>
	</tr>
	<c:forEach items="${list}" var="item" >
		<tr>
			<td align="center"><a href="${url}/select?id=${item.id}">${ item.id eq data.id ? '&#x2611;' : '&#x2610;' }</a></td>
			<td align="center"><a href="${url}/delete?id=${item.id}">&#x2612;</a></td>
			<td align="center"><a href="${url}/select?id=${item.id}">${item.id}</a></td>
			<td>${item.firstName}</td>
			<td>${item.lastName}</td>
		</tr>
	</c:forEach>
</table>


<jsp:include page="footer.jsp"/>