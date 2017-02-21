/**
 * 
 */
package fr.imie;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

/**
 * @author imiedev
 *
 */
public class Client {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		System.out.println("Client : Tentative de connexion");
		try (Socket socket = new Socket("localhost", 1234);
				PrintWriter writer = new PrintWriter(socket.getOutputStream());
				BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));) {
				Scanner sc = new Scanner(System.in);
			System.out.println("Connecté");
			while (true){
				writer.println(sc.nextLine());			
				writer.flush();
			}

		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}

}
