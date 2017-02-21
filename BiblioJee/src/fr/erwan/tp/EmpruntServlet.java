package fr.erwan.tp;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/emprunts/*")
public class EmpruntServlet extends HttpServlet {

	private static final long serialVersionUID = -7675986528804174535L;

	private static final String VIEW = "/emprunts.jsp";
	
	AbstractFactory factory = AbstractFactory.getFactory();

	private void select(Emprunt data, HttpServletRequest request) {
		data = factory.getEmpruntDAO().findOne(data);
		request.setAttribute("data", data);
	}

	private void save(Emprunt data) {
		if (data.getId() == null) {
			factory.getEmpruntDAO().insert(data);
		} else {
			factory.getEmpruntDAO().update(data);
		}
	}

	private void delete(Emprunt data) {
		factory.getEmpruntDAO().delete(data);
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
		request.setAttribute("listEmprunts", factory.getEmpruntDAO().findAll());
		request.setAttribute("listLivres", factory.getLivreDAO().findAll());
		request.setAttribute("listMembres", factory.getMembreDAO().findAll());
		request.getRequestDispatcher(VIEW).forward(request, response);
	}

	private Emprunt data(HttpServletRequest request) {
		Emprunt emprunt = new Emprunt();
		if (request.getParameter("id_membre") != null && request.getParameter("id_membre").isEmpty() == false) {
			emprunt.setId_membre(Integer.parseInt(request.getParameter("id_membre")));
		}
		if (request.getParameter("id_livre") != null && request.getParameter("id_livre").isEmpty() == false) {
			emprunt.setId_livre(Integer.parseInt(request.getParameter("id_livre")));
		}
		if (request.getParameter("id") != null && request.getParameter("id").isEmpty() == false) {
			emprunt.setId(Integer.parseInt(request.getParameter("id")));
		}
		return emprunt;
	}

}
