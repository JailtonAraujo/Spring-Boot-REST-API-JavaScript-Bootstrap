package br.com.projetorestapi.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
    
    @DeleteMapping(value = "deletar")
    @ResponseBody
    public ResponseEntity<String> deletarUsuario(@RequestParam Long id){
    	
    	usuarioRepository.deleteById(id);
    	
    	return new ResponseEntity<String>("Deletado com sucesso", HttpStatus.OK);
    }
    
    @GetMapping(value = "burscarPorId")
    @ResponseBody
    public ResponseEntity<Usuario> buscarUsuarioId(@RequestParam(name = "userId") Long Userid){
    	
    	Usuario usuario = usuarioRepository.findById(Userid).get();
    	
    	return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
    }
    
    @GetMapping(value = "atualizar")
    @ResponseBody
    public ResponseEntity<?> atualizar(@RequestBody Usuario usuario){
    	
    	if(usuario.getId() == null) {
    		return new ResponseEntity<String>("Usuario não identificado para atualização", HttpStatus.NOT_FOUND);
    	}
    	
    	Usuario usuarioR = usuarioRepository.saveAndFlush(usuario);
    	
    	return new ResponseEntity<Usuario>(usuarioR, HttpStatus.OK);
    }
    
    @GetMapping(value = "buscarPorNome")
    @ResponseBody
    public ResponseEntity<List<Usuario>> buscarPorNome(@RequestParam(name = "name") String name){
    	
    	List<Usuario> listUsers = usuarioRepository.buscarPorNome(name.trim().toUpperCase());
    	
    	return new ResponseEntity<List<Usuario>>(listUsers, HttpStatus.OK);
    }
}
