package com.tweetapp.test.serviceTest;

import org.mockito.InjectMocks;

import com.tweetapp.model.Tweet;
import com.tweetapp.model.User;
import com.tweetapp.model.UserResponse;
import com.tweetapp.repository.TweetRepository;
import com.tweetapp.repository.UserRepository;
import com.tweetapp.service.UserServiceImpl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class UserServiceTests {

	private MockMvc mockMvc;

	@Mock
	private UserRepository userrepo;

	@Mock
	private TweetRepository tweetRepo;

	@InjectMocks
	private UserServiceImpl userServiceMock = new UserServiceImpl();

	@BeforeEach
	public void setup() {

		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void registerPositiveTest() throws Exception {
		User registerDTO = new User();
		registerDTO.setId("id");
		registerDTO.setEmail("fse@gmail.com");
		registerDTO.setFirstName("admin");
		registerDTO.setLastName("admin");
		registerDTO.setPassword("admin");
		registerDTO.setUsername("admin");

	

		when(userServiceMock.createUser(registerDTO)).thenReturn(registerDTO);
		 
		User actualresp = userServiceMock.createUser(registerDTO);

		assertEquals(registerDTO, actualresp);
	}
	
	@Test
	public void signUpPostiveTest() throws Exception{
		User user = new User();
		user.setId("id");
		user.setEmail("fse@gmail.com");
		user.setFirstName("admin");
		user.setLastName("admin");
		user.setPassword("admin");
		user.setUsername("admin");
		UserResponse loginRequestDTO=new UserResponse();
		loginRequestDTO.setUser(user);
		loginRequestDTO.setLoginStatus("success");
		
		
		when(userrepo.findByUsername("admin")).thenReturn(user);
		
		UserResponse actual=userServiceMock.loginUser(user.getUsername(),user.getPassword());
		assertEquals("success",actual.getLoginStatus());
	}
	
	@Test
	public void getAllUsersPositiveTest() throws Exception{
		
		List<User> registerList = new ArrayList<>();
		User register = new User();
		register.setId("id");
		register.setEmail("fse@gmail.com");
		register.setFirstName("admin");
		register.setLastName("admin");
		register.setPassword("admin");
		register.setUsername("admin");
		
		registerList.add(register);
		
		
		List<User> expectedList = new ArrayList<>();
		
		User userDTO = new User();
		userDTO.setId("id");
		userDTO.setEmail("fse@gmail.com");
		userDTO.setFirstName("admin");
		userDTO.setLastName("admin");
		userDTO.setPassword("admin");
		userDTO.setUsername("admin");
		
		expectedList.add(userDTO);
		
		
		when(userrepo.findAll()).thenReturn(registerList);
		
		List<User> actual=userServiceMock.getAllUsers();
		assertEquals(registerList,actual);
		
		
	}
}
