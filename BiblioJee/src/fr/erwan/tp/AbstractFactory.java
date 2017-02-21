package fr.erwan.tp;

public abstract class  AbstractFactory {
	
	public static AbstractFactory getFactory(){
		
		return new Factory();
		
	}
	
	public abstract DAO<Livre> getLivreDAO();
	
	public abstract DAO<Membre> getMembreDAO();
	
	public abstract DAO<Emprunt> getEmpruntDAO();

}
