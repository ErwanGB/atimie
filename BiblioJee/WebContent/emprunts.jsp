<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>    
<jsp:include page="header.jsp"/>

<c:url var="url" value="/emprunts" />

<%-- <form method="post" action="${url}/save" >
	<input name="id_membre" value="${data.id_membre}" /><br/>
	<input name="id_livre"  value="${data.id_livre}"  /><br/>
	<input name="id" value="${data.id}" type="hidden" />
	<input type="submit" value="${ empty data.id ? 'Insert' : 'Update' }" />
</form> --%>


<div>
 	<form method="get" action="${url}/save" >
		Ajouter un nouvel emprunt :<br/>
		Membre : 
		<select name="id_membre">
			<c:forEach items="${listMembres}" var="item" >
				<option value="${item.id}">${item.lastName}</option> 
			</c:forEach>
		</select><br/>
		Livre : 
		<select name="id_livre">
			<c:forEach items="${listLivres}" var="item" >
				<option value="${item.id}">${item.title}</option> 
			</c:forEach>
		</select><br/>	
		<input type="submit" value="${ empty data.id ? 'Insert' : 'Update' }" />
	</form>
</div>




<table>
	<tr>
		<th align="center">update</th>
		<th align="center">delete</th>
		<th align="center">id</th>
		<th>Id Membre</th>
		<th>Nom membre</th>
		<th>Id Livre</th>
		<th>Titre Livre</th>
		<th>Date d'emprunt</th>
	</tr>
	<c:forEach items="${listEmprunts}" var="item" >
		<tr>
			<td align="center"><a href="${url}/select?id=${item.id}">${ item.id eq data.id ? '&#x2611;' : '&#x2610;' }</a></td>
			<td align="center"><a href="${url}/delete?id=${item.id}">&#x2612;</a></td>
			<td align="center"><a href="${url}/select?id=${item.id}">${item.id}</a></td>
			<td>${item.id_membre}</td>
			<td>${item.nom_membre}</td>
			<td>${item.id_livre}</td>
			<td>${item.titre_livre}</td>
			<td>${item.date_start}</td>
		</tr>
	</c:forEach>
</table>

<table>
	<tr>
		<td align="center"><a href="${url}/">${ empty data.id ? '&#x2611;' : '&#x2610;' }</a></td>
		<td align="center"></td>
		<td align="center"><a href="${url}/">new</a></td>
	</tr>
</table>



</body>
</html>
<jsp:include page="footer.jsp"/>