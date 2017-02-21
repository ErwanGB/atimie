package fr.imie;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
	public static void main(String[] args) {
		try (ServerSocket server = new ServerSocket(1234);) {
			System.out.println("Serveur Attente de de connexion");
			while (true) {
				Socket socket = server.accept();
				new Thread(new Runnable() {
					@Override
					public void run() {
						try (PrintWriter writer = new PrintWriter(socket.getOutputStream());
								BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));) {
							System.out.println("Client Connecté");
							while (true) {
								String txt = reader.readLine();
								if (txt != null) {
									System.out.println(txt);
								}
							}
						} catch (IOException ex) {
							System.out.println("erreur");
							ex.printStackTrace();
						}
					}
				}).start();
			}
		} catch (IOException ex) {
			System.out.println("erreur");
			ex.printStackTrace();
		}
	}
}
