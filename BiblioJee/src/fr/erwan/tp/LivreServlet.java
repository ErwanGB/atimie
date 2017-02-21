package fr.erwan.tp;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/livres/*")
public class LivreServlet extends HttpServlet {

	private static final long serialVersionUID = -7675986528804174535L;

	private static final String VIEW = "/livres.jsp";
	
	AbstractFactory factory = AbstractFactory.getFactory();

	private void select(Livre data, HttpServletRequest request) {
		data = factory.getLivreDAO().findOne(data);
		request.setAttribute("data", data);
	}

	private void save(Livre data) {
		if (data.getId() == null) {
				factory.getLivreDAO().insert(data);
		} else {
				factory.getLivreDAO().update(data);
		}
	}

	private void delete(Livre data) {
			factory.getLivreDAO().delete(data);
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
		request.setAttribute("list", factory.getLivreDAO().findAll());
		request.getRequestDispatcher(VIEW).forward(request, response);
	}

	private Livre data(HttpServletRequest request) {
		Livre person = new Livre();
		person.setTitle(request.getParameter("title"));
		person.setAuthor(request.getParameter("author"));
		if (request.getParameter("id") != null && request.getParameter("id").isEmpty() == false) {
			person.setId(Integer.parseInt(request.getParameter("id")));
		}
		return person;
	}

}
