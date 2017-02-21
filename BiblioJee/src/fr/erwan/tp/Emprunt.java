package fr.erwan.tp;

import java.sql.Date;

public class Emprunt {
	
	private Integer id;
	private Integer id_membre;
	private Integer id_livre;
	private String nom_membre;
	private String titre_livre;
	private Date date_start;
	private Date date_end;
	private Boolean activ;
	
	public String getNom_membre() {
		return nom_membre;
	}
	public void setNom_membre(String nom_membre) {
		this.nom_membre = nom_membre;
	}
	public String getTitre_livre() {
		return titre_livre;
	}
	public void setTitre_livre(String titre_livre) {
		this.titre_livre = titre_livre;
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getId_membre() {
		return id_membre;
	}
	public void setId_membre(Integer id_membre) {
		this.id_membre = id_membre;
	}
	public Integer getId_livre() {
		return id_livre;
	}
	public void setId_livre(Integer id_livre) {
		this.id_livre = id_livre;
	}
	public Date getDate_start() {
		return date_start;
	}
	public void setDate_start(Date date_start) {
		this.date_start = date_start;
	}
	public Date getDate_end() {
		return date_end;
	}
	public void setDate_end(Date date_end) {
		this.date_end = date_end;
	}
	public Boolean getActiv() {
		return activ;
	}
	public void setActiv(Boolean activ) {
		this.activ = activ;
	}	
}	
	
	

