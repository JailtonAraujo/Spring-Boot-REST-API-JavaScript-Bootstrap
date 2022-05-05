package br.com.projetorestapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetorestapi.model.Usuario;
import br.com.projetorestapi.repositorys.UsuarioRepository;

/**
 *
 * A sample greetings controller to return greeting text
 */
@RestController
public class UsuarioController {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
    /**
     *
     * @param name the name to greet
     * @return greeting text
     */
    @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public String greetingText(@PathVariable String name) {
        return "Hello " + name + "!";
    }
    
    @RequestMapping(value = "/testando/{nome}", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public String test(@PathVariable String nome ) {
    	
    	Usuario usuario = new Usuario();
    	usuario.setIdade(20);
    	usuario.setNome(nome);
    	
    	usuarioRepository.save(usuario);
    	
    	
    	return "Ola "+nome;
    }
    
    @GetMapping(value = "listardados")/*METODO DE API*/
    @ResponseBody/*RETORNA OS DADOS PARA O CORPO DE RESPOSTA*/
    public ResponseEntity<List<Usuario>> listarDados(){
    	List<Usuario> list = usuarioRepository.findAll();
    	
    	return new ResponseEntity<List<Usuario>>(list, HttpStatus.OK);
    }
    
    @PostMapping(value = "salvarUsuario")
    @ResponseBody
    public ResponseEntity<Usuario> salvarUsuario(@RequestBody Usuario usuario){
    	
    	Usuario user = usuarioRepository.save(usuario);
    	
    	return new ResponseEntity<Usuario>(user, HttpStatus.CREATED);
    }
}
