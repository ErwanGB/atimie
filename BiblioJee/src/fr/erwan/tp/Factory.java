package fr.erwan.tp;

public class Factory extends AbstractFactory {

	@Override
	public DAO<Livre> getLivreDAO() {
		return new LivreDAO();
	}

	@Override
	public DAO<Membre> getMembreDAO() {
		return new MembreDAO();
	}

	@Override
	public DAO<Emprunt> getEmpruntDAO() {
		return new EmpruntDAO();
	}

}
