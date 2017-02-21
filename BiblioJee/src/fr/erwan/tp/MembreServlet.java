package fr.erwan.tp;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/membres/*")
public class MembreServlet extends HttpServlet {

	private static final long serialVersionUID = -7675986528804174535L;

	private static final String VIEW = "/membres.jsp";
	
	AbstractFactory factory = AbstractFactory.getFactory();

	private void select(Membre data, HttpServletRequest request) {
		data = factory.getMembreDAO().findOne(data);
		request.setAttribute("data", data);
	}

	private void save(Membre data) {
		if (data.getId() == null) {
			factory.getMembreDAO().insert(data);
		} else {
			factory.getMembreDAO().update(data);
		}
	}

	private void delete(Membre data) {
			factory.getMembreDAO().delete(data);
	}

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String path = request.getPathInfo();
		if (path == null) {
		} else if (path.matches("/save.*") || request.getMethod().matches("POST|PUT")) {
			save(data(request));
		} else if (path.matches("/delete.*") || request.getMethod().matches("DELETE")) {
			delete(data(request));
		} else if (path.matches("/select.*")) {
			select(data(request), request);
		}
		request.setAttribute("list",factory.getMembreDAO().findAll());
		request.getRequestDispatcher(VIEW).forward(request, response);
	}

	private Membre data(HttpServletRequest request) {
		Membre person = new Membre();
		person.setFirstName(request.getParameter("firstName"));
		person.setLastName(request.getParameter("lastName"));
		if (request.getParameter("id") != null && request.getParameter("id").isEmpty() == false) {
			person.setId(Integer.parseInt(request.getParameter("id")));
		}
		return person;
	}

}
