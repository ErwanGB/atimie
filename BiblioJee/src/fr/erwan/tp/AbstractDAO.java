package fr.erwan.tp;

import java.io.IOException;
import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public abstract class AbstractDAO<T> implements DAO<T> {

	protected Connection getConnection() throws SQLException {
		try {

			// lecture du fichier jdbc.properties
			Properties p = new Properties();
			p.load(getClass().getResourceAsStream("/jdbc.properties"));
			String driver = p.getProperty("driver");
			String url = p.getProperty("url");
			String user = p.getProperty("user");
			String password = p.getProperty("password");

			// connexion à la bdd
			DriverManager.registerDriver((Driver) Class.forName(driver).newInstance());
			return DriverManager.getConnection(url, user, password);

		} catch (IOException | ReflectiveOperationException ex) {
			throw new SQLException(ex);
		}
	}

}
