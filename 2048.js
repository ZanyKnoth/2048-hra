 	    let cont = document.getElementById("container");       
        let canv = cont.getContext("2d"); 
        let p = document.getElementById("score"); 
        let score = 0; 
        let anim;       
        let fieldArr = [];
        let piecesArr = [];
        let size = 4;
        let lock = false;
        let gameOver = false;
        let canAdd;
        let rand;        
        let canAddNew;
      
        function Piece(xa, ya)
        {      
          this.x = xa;
          this.y = ya;
          this.newX = xa;
          this.newY = ya;
          this.level = 0;
          this.num = 2;
          this.width = this.height = 60;
          this.color = ["#eee4da", "#ede0c8", "#f2b179", "#f59563", "#f67c60", "#f65e3b", "#edcf73", "#edcc62", "#edc850", "#edc53f", "#edc53f"];
          this.isMerging = false;
          this.dist;
          this.angle;
          this.isMoving = false;

          this.update = function()
          {  
            if(this.level >= this.color.length-1)
            {
              this.level = this.color.length-1;
              
            }
             
            if(this.isMoving == true)
            {
              this.dist = Math.sqrt(Math.pow(this.x-this.newX, 2)+Math.pow(this.y-this.newY, 2));
              this.angle = Math.atan2(this.newY-this.y, this.newX-this.x);
              
              this.y+=Math.sin(this.angle)*18;
              this.x+=Math.cos(this.angle)*18;
        
              if(this.dist <= 8)
              {
                this.x = this.newX;
                this.y = this.newY;
                
                this.isMoving = false;
                
              }         
            
            }
            
            canv.beginPath();
              canv.rect(this.x, this.y, this.width, this.height);
              canv.fillStyle = this.color[this.level];
              canv.strokeStyle = this.color[this.level];
              canv.stroke();
              canv.fill();
            canv.closePath();
          
            canv.beginPath();
              canv.fillStyle = (this.level > 1 ? "white" : "grey");
              canv.font = 25-(this.num.toString().length*2) + "px Arial";
              canv.textBaseline = "middle"; 
              canv.textAlign = "center";
              canv.fillText(this.num, this.x+this.width/2, this.y+this.height/2);
            canv.closePath();
          }
         
        }  
        
        function FieldPiece(xe, ye, pos)
        { 
          this.x = xe;
          this.y = ye;
          this.width = this.height = 60;
          this.pos = pos;
          this.piece = [];
        
          this.update = function()
          {          
            canv.beginPath();
              canv.rect(this.x, this.y, this.width, this.height);
              canv.strokeStyle = "#cdc1b4";
              canv.fillStyle = "#cdc1b4";
              canv.stroke();
              canv.fill();
            canv.closePath();
        
          }      
        }    
      
        for(let i = 0; i < size; i++)
        {
          for(let j = 0; j < size; j++)
          {
            fieldArr.push(new FieldPiece(160+(j*70), 160+(i*70), (i*size)+j+i));
      
          } 
          
        } 
      
        rand = Math.floor(Math.random() * fieldArr.length);
        
        let newT = new Piece(fieldArr[rand].x, fieldArr[rand].y);
        piecesArr.push(newT);
        fieldArr[rand].piece.push(newT);

        let spust = function() {   
          anim = requestAnimationFrame(spust);      
          canv.clearRect(0, 0, 1000, 1000);  
        
           canv.beginPath();
             canv.rect(150, 150, 291, 291);
             canv.fillStyle = "#bbada0";
             canv.fill();
           canv.closePath();
           
           canAddNew = false;
        
            for(let j = 0; j < fieldArr.length; j++)
            {
              fieldArr[j].update();
              
              if(fieldArr[j].piece.length == 0)
              {
                canAddNew = true;
              
              }
              
              if(fieldArr[j].piece.length == 2)
              {
                if(fieldArr[j].piece[1].x == fieldArr[j].piece[1].newX && fieldArr[j].piece[1].y == fieldArr[j].piece[1].newY)
                {
                  fieldArr[j].piece[0].num+=fieldArr[j].piece[0].num;
                  fieldArr[j].piece[0].level++;
                  fieldArr[j].piece.splice(1,1);
                  
                  score+=fieldArr[j].piece[0].num;
                  p.innerHTML = "Points: " + score;
                
                }
              }
                  
            }     
         
          lock = false;
         
          for(let i = 0; i < piecesArr.length; i++)
          {           
            if(piecesArr[i].isMoving)
            {
              lock = true;
           
            }
            
            if(piecesArr[i].isMerging == true && piecesArr[i].isMoving == false)
            {
              piecesArr.splice(i, 1);
            
            } 
            
            if(piecesArr[i] != undefined)
            {
              piecesArr[i].update();
            
            }
          }  
          
          if(lock == false && canAdd == true)
          {            
            if(canAddNew == true)
            {
              while(true)
              {
                rand = Math.floor(Math.random() * fieldArr.length);
              
                if(fieldArr[rand].piece.length == 0)
                {
                  newT = new Piece(fieldArr[rand].x, fieldArr[rand].y);
                  piecesArr.push(newT);
                  fieldArr[rand].piece.push(newT);
                
                  break;
                }
              
              }
              canAdd = false;
            }
          }
          
          if(gameOver)
          {
            alert("Konec");
            cancelAnimationFrame(anim);
            
          }
        }        
           
        spust();
            
      
        function clickk(direction, event)
        {         
          if(lock == false && (direction != "" || event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40))
          {
            canAdd = false;
            gameOver = true;
            
            move([0, "j < size", "j++", "j*(size)+i", "(j+1)*(size)+i", "k < (size)*(size)+i", "k+=size", 9999, true]);

            move(["size-1", "j >= 0", "j--", "j*(size)+i", "(j-1)*(size)+i", "k >= i", "k-=size", -9999, true]);

            move([0, "j < size", "j++", "i*(size)+j", "i*(size)+j+1", "k < i*(size)+size", "k++", 9999, true]);

            move(["size-1", "j >= 0", "j--", "i*(size)+j", "i*(size)+j-1", "k >= i*(size)", "k--", -9999, true]);
                                                    
            if(direction == "up" || event.which == 38)
            {
              move([0, "j < size", "j++", "j*(size)+i", "(j+1)*(size)+i", "k < (size)*(size)+i", "k+=size", 9999, false]);
            }
            
            else if(direction == "down" || event.which == 40)
            {
               move(["size-1", "j >= 0", "j--", "j*(size)+i", "(j-1)*(size)+i", "k >= i", "k-=size", -9999, false]);

            }
            
            else if(direction == "left" || event.which == 37)
            {
               move([0, "j < size", "j++", "i*(size)+j", "i*(size)+j+1", "k < i*(size)+size", "k++", 9999, false]);

            }      
                           
            else if(direction == "right" || event.which == 39)
            {
               move(["size-1", "j >= 0", "j--", "i*(size)+j", "i*(size)+j-1", "k >= i*(size)", "k--", -9999, false]);
                                             
            } 

          }
        }
      
        function movement(event)
        {
          xMove = event.clientX-cont.offsetLeft;
          yMove = event.clientY-cont.offsetTop; 
                 
        }
            
        function move(params)
        {
          for(let i = 0; i < size; i++)
          { 
            for(let j = eval(params[0]); eval(params[1]); eval(params[2])) 
            {
              if(fieldArr[eval(params[3])].piece.length == 0)           
              {
                for(let k = eval(params[4]); eval(params[5]); eval(params[6])) 
                {
                  if(fieldArr[k].piece.length > 0)
                  {
                    if(params[8] == false)
                    {
                      fieldArr[k].piece[0].isMoving = true;
                      fieldArr[k].piece[0].newX = fieldArr[eval(params[3])].x;
                      fieldArr[k].piece[0].newY = fieldArr[eval(params[3])].y;
                                             
                      fieldArr[eval(params[3])].piece.push(fieldArr[k].piece[0])
                      fieldArr[k].piece = [];
                        
                      canAdd = true;
                    
                    } else {
                      
                      gameOver = false;
                    
                    }
                    
                    k = params[7];

                  }
                }             
             
              }
            
              if(fieldArr[eval(params[3])].piece.length > 0) 
              {
                for(let k = eval(params[4]); eval(params[5]); eval(params[6])) 
                {
                  if(fieldArr[k].piece.length > 0)
                  {                
                    if(fieldArr[eval(params[3])].piece[0].num == fieldArr[k].piece[0].num)
                    {
                      if(params[8] == false)
                      {
                        fieldArr[k].piece[0].isMerging = true;
                        fieldArr[k].piece[0].isMoving = true;
                        fieldArr[k].piece[0].newX = fieldArr[eval(params[3])].x;
                        fieldArr[k].piece[0].newY = fieldArr[eval(params[3])].y;
                    
                        fieldArr[eval(params[3])].piece.push(fieldArr[k].piece[0]);
                        fieldArr[k].piece = [];
                    
                        canAdd = true;
                      
                      } else {
                      
                        gameOver = false;
                    
                      }
                    
                    }   
                        
                    k = params[7];         
                  }
                }                         
              }      
            }           
          }
        
        }
        
        document.getElementsByTagName("body")[0].addEventListener("keydown", function(){clickk("", event)});
        cont.addEventListener("mousemove", function(){movement(event)});