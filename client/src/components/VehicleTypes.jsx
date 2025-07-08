import { useState } from 'react';
import { motion } from 'framer-motion';

const vehicleData = [
  {
    id: 1,
    type: '2-Wheeler',
    weightCapacity: '0-20 KG',
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMREhUSExITEBIWFRcSFRgXFRgYFxUXFRUWGBcYGBUYHSkgGBslHRcVITMhJS0rLjouGB8zODMsOCgtLisBCgoKDg0OFg8PFisZFx0tKys3NzItKystKywtNysrKy00NysrNy0rKysrNys3Ky0rKzgtKysrNysrLSsrKy03Lf/AABEIAKgBKwMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBAUBCAL/xABJEAACAQIDBgMEBwUDCQkAAAABAgMAEQQSIQUGEzFBUSJhcQcygZEUI0JSobHBYnKCktEzU6IVQ0RUg5Oy0vEWF2NzdNPh4vD/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAHBEBAQEAAwEBAQAAAAAAAAAAAAERAhIhMSID/9oADAMBAAIRAxEAPwC8aUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUpQKUqrt+t6p8FtSPKzGEYdG4eY5GvJKHuvInwgX5iw9KC0aVrbOxqTxJNGbo6h19COvY9LVs0ClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUGttE/VPqV8JuQbEDqQehtfWqh9rexli4eKTJGFth3QKQXJJ4eQKNW94W7W7VczKCCCLg6EHrUf25svBKvExZVkVXVBNJdRnQhgoc2ZytwCbtqQCLm4Ytx4fo0b4FjmkwzXvy4kcxaRJAtzYXMiesTVJqp3d/efEYnEwovMbMRJ3uEk40coDEuDyOYN4QffI72nWB23NF4Z1Lr1dRcr62A087D1NBKKVjw86yKGRgynqKyUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUClKUCqO9rO8gnxRgueBhipGVkZHldSSzEXykAkAHs9XNtXAjEQyQl3jEiNGWQ5XUMLXU2NjVIe0zcMbNw8UkDvJBxMsufLmVyto2JUAZfeXloSPvUEPwO88uGlMuHy8R/qzxFupW9zrcEahNb96s/dPeWfE4XjSCGJ+IY01ZUfLl1GY3W5zDmdRVOYWNCwWTOFYgXQhct+uqt1sOlTyGYcKOAAJFGMqrfzJJPckkknuTU5M8liQ7WaENJw2iddWVRnVwOZKCxPqNfWphsfaH0iISZHjvpZ0ZT01AYAldedqqzZO1ggCnxqNBY3IB5rbna1WjsKcvAjMpU5evXz+Pw9KQjoUpSq0UpSgUpSgUpSgUpSgUpSgUpSgUpSgUpSgUpWjJtaJQzM2VVLAsQQoykqdeXMGg3qVrSbQiVBIZFyEXDA3BHlbn8K0U3nwh/0iMepI/MUHXpWjHtjDtynhP+0X+tbKYlG5Op9GBoMtK8Br2gUpSgUpSgUpSgVo7b2XHi4JcPILpKhQ9xfkw8wbEeYrepQfJW08BJhZpMPLpJE5RuxtyYeTAhh5EVPNi7TGIiSKExSYplbwu2ULkHiLGxt3A1PlYEjue2/BCFocUkUV5QcNJKUzOpALIFDXVSV4oz5c1lADCqfw0jRvmRiGBDAg6g8xY1bNZsfQmw8disMqq8GHEIGqwli+vNs7WDnmToL+VS/AY6OZc0bBhyPcHsR0NVJuXvhxVySe+o8S9xyzp5d16ehFS9NCJoHyseo91h2ZetZ+GptSuZsna6zeEjJKBcqeo5ZlPVa6dVopSlApSlApSlApSlApSlApSlApSlApSlArn4vZYZi6O8LnVstirWFvEjAjlYXFjoNdK6FR/bG8WS6QASPyLnWNT8PfPkNPPpQQ/a22Ylkkw2LwvFRWN5cKzFeZAzqtmV7DVbnW4ua5M+wsPiBm2fihK3WGUhZPRSba+RH8VbWLe4swVrXNyNbk3J8ta42MgVvs3Pr+vOmVlyppXicxyBo5F0KuCrD4HmD0I0PSvVxx711sfsr6eEDyzRmO+TW6jNa9r620Gl6039n+KH9liEl/eGU/gLVoINsuvJiPQkflXWwm9c493ESDyLEj/Feo1it3MfDq2Hdh3QZh/hvXKbFMpsylW7HQ/I0wWZFvpjF/zgf1RP0ArYT2gYoc0hb1Vv0aqzwm2wDbMD0tfWuzBjEfkde1MVOU9ok/WGI+mYfqa/X/AHjy/wCrx/zt/SoQz1jZqYankftLa/iwykeUhv8AitSvd3eeDGgiMlZALtG1gwHK4+8L9R5XteqSd6xxYtonWSNjHIhzIw5gj8weRHY1MNfRlK426O2/p2EixOXKXDBh0DI7I1vK6m3lXZqK5O9WxVxuEmwzWHEQhWIByPa6OB3DWNfLUmHZCyOCskbsjr91kOVh8CCPhX13VM+2fdMRyf5QiByyFY8QOgewWOTyBsEPmV6k1YKywsxUh1OVgbgjofj+VWdudvCs4yXEUw1K/ZcfeVSfmOY72qqEbKxX41tYecqwZWKspzKQbEEdQaWazi+Ul1U34bg+Bh0PkT/wnnrzFSnZO0DKCGADrztybzHUeh5efM1luvvD9KhJYASL4ZB0N+TW7NY6dwR0ru4TGuh8JJ5lQLl7DnYc3A6jU+t7DCS4nkcytcKysRzsQbetqyVWe5O7DDFzYv6dMZGcsE8BSRHszM1hZhmJAy2sAKsytNlKUoFKUoFKUoFKUoFKUoFKUoFY8ROsas7sFRQWYnkAOZrJUS33xKsUgaVoltxWyrmzWJyj4EXtY627CizN9cjbG+a2PF4scTEgBQout9A1mz3tzA0oWRlDWKggEBlZSB08DC49K5WxsPBMxlgEuIlRQymbJcKb+KNFAHO4uRcEVknZgbOCD5ix/Gpbif0vHfy2SY7+4G9f6CvC0f8Acx/L/wCa18OwJsSFGmuZRzIH2iB179POszYbnlNwLa5TrcgCxFweY637gVJOVcvWwuIT+5h/kt+VZUxKf3SD0LD9a5a6+6VbS/hYNpe19Dy0NeCSpdn012hiR0DD0kasWIySCzhnH7RDj/EK56zV6Z6mmuPtLcTAzMWKyRlueUgDkB7vIcu1cbEezhl1wmMN+iSjn5Ai1vgDUqlxVazYir2q6gM2KxOFbh4mIqRyYaq1u1qxvt+/uqxPkDVhTyrKvDmUSp58x6N0qK7W3YZLyQEyxjUr9tB5jqPMVucllcFsdM3Jcv7x/QVm2TgpJ544mnjhDuFzsCUW50uLi9+XMakViFfn6NJMwhiUu7kKoAJ19B0HMnoPjWmn1Ds7AxwRrFDGkUa3yqihVFySbAdySfU1s1gwGG4UaRgs2RFS7EsxygC5Y6k6czWesqVwN/cQsezsWzhWHAkWzags65VBH7xFd+q89t+P4eAWLrNMi2/ZS8h/FU+dBQOIDc9W/OvMH43VAcpY2v0Hc1u4c661ixeFAIZGFxr2sfKtXc8SZvqQ7GnGBxMTmUSRP9VL0KhiNSASLA5TfyI61ZmMwGYWBynmp+6w5EfP5E1RLTOb5rNYelvlV3br4tpcJAze8YwDfmchKXPrlv8AGuUnKT9Xav8AW8e1vCZH7w+3jHIQ6mKRTmVtLOoVbnNexa+Y3PO9mtcEWFsfai4hMykX6j9R5f8ASoLiogeYBrJsjEPAyyIpyXs3hIQjkfFawI/TyFrrEqxqVjw8odVYcmAYehFxWStNlKUoFKUoFKUoFKUoFKUoFRzGbl4WSeTEkSLNLbOyyNY5UVFOQ3XQKOn5mpHUZ9o28X0DAyyqfrmBihHeRgbH0UBmPkpoKm2RvTDg8XKt2jWOeSNCwuLI7KwJUaBrcuQsNRapzFvzgcQLO0TfxD8jy+dUjszATyyqWPExUxOQyPcKLEyTSub2VVuSe16623N6UjQYXZqqioMsuMKKMRiW1uyuRmiS5JAFja3IaVLNZsWrPhcNJrFIU8j4h8650+BePxCx/aQ3P4aiqa2eMQD9XJNfrlLH586keG2ltKPrI1vvKD+VTE6psuJZiAud2H7IdtDfmwJtfX1rNBCQAoVvCLW0Yj1CkkVCf+2cym0sX7yglCfMoetSTYu0oMWt428Q95G0dT5j9RpS6ljotJY2Oh7HT8DWN5q2PGBbMbdibj5HSoPtuaeLGGJOI3FAeNUQuTcG4VFB6q+ijQVmTUShpq/BkqJYbeBzpdGINiDdWuOY161vx7b+8jD0savUx3TLXqYoqbgkGuMu1oz9oD1uPzr9nFA6hgR5GpgxbzLGwEqqEkJs+X3WuCc1uh0/GpF7Ftm58ZLNY5YIQg7Z5m/MLGf5qh22p7qq92v8tP1q3/Y3s3hbP4pFmxEjzfwA8OP4FUzfxV0nxvindKUo0VSXt2x+fFQQA6RxGQ9rytYfG0f41dtfNHtCx/H2linvcCThL5CJRGbeV1Y/GkHDiGlYZnt61lkawtWxsjZjzyBEHi5knRUUc2Y9AP8Apc6Vplk3f2GZ5MvJR4pG+4vbzY9B3t61bOAZI0AFkRVAH7KqLC59BzqP4WOPDpkQ2RfEzNYFyBq7dhzsOg8ySY9tnedi2REzRFQya/2t+R/d5i3O4NYvrN9SXaO02xDFIyUi5EjRm+PQV190oHwjXjmkEZ96MnNGT3yn3T5ix73qpMXjsXfNnkhHQLdAPw1+N6z4Pe7HxcpllHaRFP8AiWzfjUyr1r6c2fj1lGmh6j+nlW5Va+z3bS7QXPE/BxEf9pC41H7SuPfQ8r2FuRHK9kiq1HtKUqqUpSgUpSgUpSgUpSgVTPt6dXlw8bTEBFaV0HJYzoWY8yzEBVHZX530uDGYpIY3lkYJGil3Y8lVRck/AVV27u6820ccdo4yMxwZ+LHG/OUrpCCpvaNFsemZvFax1Cs9vwPg4ViI4eKxcYklFrHD4S/1MHkXKl35e6otzvp7A2Pxbs1xEhANubE/YHmbjtz6akdj2kSmTaOLkJv9bwxryEShLDy8JPqTXd3Lkjw+IwqyRu6pG2IsuXWbMVW+cgALZnBJ5yWqje2lunicLFHLwQ0ORy8MTFZQchyXbTM1yCV5HKRodDxtm4vBLshA78XaMzlswTxxASDw5j4VBVbA66ufCbEVY+8G9LzRmKKEpewe7xM9ulkjZso/b6dLE3FcY7gGUMUKrIeMPAyo8gGjqwGUliL35G9x1uEZXaXNMVldM7IGyEFbEjMGAtz00ta2oNam1MA0Dho3Kt70bqbEjtp1HXpy6GvcZg5MzpbPG2ZwRyQsxOp6EGt3Cqz4Mq1iYrFW5+G9tfgT8FXtQdHd3f7lHihY8hKo0/jUcvUfIVIdtbMjxqJIsmR0u0UqEMPFa4I5OpsNP0JBqd4/EasnYEvDwMLAAO7EX7iMZLfELf1rOM2NHGYhEOXamEEg5Li4Myt5ZmXUHyYMOy9a5wW8gjjb6TmBYGJWLBRYgyRgXS4I15HyqYQ7QR9G8J5EH3T8f61t7PhjiBESpGpNyEAAJ7m3Or2xNQpomU5XA9G8LD51jfCDmAR6a/itWUmNPIm47cx8qxYjCxMM3Bgbv9WoPzWxp3hqr8TEQQcxI5EE6i/UXq390/aLh4cJBDJDMDHEsV0VCp4Yyi3iB5AdKjkuGw3Iwsn7krflJnFYhgcL3xA/3Tfki02GrGj9pGBPMzJ6xMf+G9bCe0DZ5/z5HrFL/wAlVidl4Y8p5l9YFP5Sivf8jQdMW3xwp/Sc08XssjaPtEwEcTus3EZUZlUJICxA0W5WwubDXvXzxnLsztqzEsx7ljc/ian0mwoSLHFXH/pj/wC7Wqm7uFU3aSSXX3ViEd/VmZ9PhTYajWyNkSYl7INBqztokY7k/wD7sATpUxSOLDRFENkHikkbQuR1PZR0X8zWSfFKkZCqIoUBcqtyAFFyzHmxAHM9qr/ae3GxTWAKwg+FerW+03n2HT1qbqfXaxEj445FPDgLhAWIXiOSAAS2irqDrpqL6kAZdwsVEuI4M4cRo7xsLlXVcxDXCm91azEdjIe1c7eLaRwqrhUy+4BISiE3DHNlLKSCxzG4sdQNenMw22CSrZcvCIyEgWZSQDGSB26crZtB1sjci590djYfFrOplfiLPKsbI9s0auQnhPvaAE6faFRvfPcbhNY5Azf2cigKrkfZkQcjqPEO452rnbPxxWPJCzGVmM6EmzrHopaOQgqrLmt4uWRuwtZeyNkPjoXlxhWScpwhYeGMhRoo7XIJ+8SbgAKBVxSexNpTYLEiVbpPEStj9oXsyN3H9PS30zsraCYmGOePVJEDjuLjkfMcvhXzdvVGM0Uw1LqQTzzZLZWJHMlGT5VbnsWxpfBNHz4crAej+K3zJPxA6UFgUpSohSlKBSlKBSlKBSlKD8ugIsQCNDqL6g3H4gGv1SlB84+07D5MdiR3kznS3vi/L4jXrzqU+y7aIXHR5rAT4Uxg/wDiJIZMv8hQ/wAYrZ9uGw2PDxaqSpHCk5eE/YPfXl8B3qut3to2HDz8N1bPC33XBuOXLX48jzVRVFvb8SxnE6tc5FjC9cwLljcnQDPGPU2GtQvaOFMxRHMfhEdnLMSQhUqCmWyXKDqRpy1uO7urvHhocPOMWXfFsrByyBuKhvly28IGt2JNibm5tZdDY0DJLgUxEccpmhaNUmlyxyEBZFkcrmzEKsgysObi4UnQInvGrl+HNnjAW+vhViTpZiLECwHodLWrDhoyuDmdreMFRbrqFBHcEmQfwGptvNsNcy5MRFGjt9bh4AWTKRrlZiVOo7AanloDCdu4uNEEEWkUdzzuCT0B7C5F+pZj2NBH9kbNOIxCRC92IvYEkAAs3hUEnQHQCrHi2ZwMOIXSVEVi6s6MpXMTdsrhTkNydQOZ+G17DN3S0j45xYJeOPzdh4/gFI+LeVXRJGGBVgGUgggi4IOhBHUUFFx7JB1MkWT72cWqQw7uyTRiPDweBTmMjjh5z+wWF8o/EknsTPtkbs4TC24MCIRezWuwub2DHUDyGldepRWj+z3EvHYYhMPJe4Zc8lteoYKD2t5nWqw2zitq4CUxzqVYE2YxgxuL6FGAFxYd797GvpmudtrYOHxiquIiEyocyglgASLX0I6UxMfNp3tma2dYixNtAwNu9sxrMN5j1iHwf+q1fK7g7MH+g4f+S/51+13E2YNfoGFPrCh/MVMOsUQu9MY95HX+U/qKzwb14Y6ZyD6f0vV/YTdvBxf2eDw0V+eSCNfyWuikSroFCjyAFMidVEQ4niW4asxuNDHLqDe+WyG55aG3rXX2bu9ip28MLoL+9IrRqP5hc/AGrjpU6nVCdp7qJBszGIDnmfDShntr7hOVR0Fxy6/K3zvgAFsTyBufhYmvrx0DAgi4IsQeoPMV8u707DbAYuXDnkGLRHvGTdD8jb1BrWNJFtbct5c2NTDnGXbJww+VU4aDxyAC5UgCwH6i/MGyDKkgzRRxoUuwjURjOmdUBLkg36qBy87VMvZhvYEUxsbkKA6/aZFFlkW/MgWVh5A9akuytipi5cTJGxhQzAqAujARomqn7JCBh+9VVAN29lvaFWw/B4eZzKjeOQuSojcKCbAEnW4923YTnBYJ4cEUlw7YyEZ5geI0d0KWtl5kZOn4VuY7ZMeBeOSQCXC3s1xpGSbi4+0l9Re+unUW09+N7EaNoYHGS15Zfshew7309dALgkgKq3r0SIHmS5te9sojj/NW+VWb7DIiMNOxGhlVR55UH/N6fjVPY/FHESjKDlFo415kKNAPMnn8a+jdxdh/QsFFCRaS2eT999SCbm9hZef2aUSClKVEKUpQKUpQKUpQKUpQKUpQa+0MEk8bxSKHjdSrA9Qf186+dN/dxp9myGQBpcIT4ZQPd/ZlCjwnz5H8B9J1qYqF2BAdRcWsUzD4i+tB8u4XbTgZWs6jUBhe3oeh8+dbw24mn1RJBvrLJYHva9Wbt32SRzsXRo8Ox58KIqp/gz5B8AK4bexKT/WwR/5f/wBqCC47eKRwVBCKeYQWzep5t8TXb3L3Jn2k6uQUwwa7yHkQQbhL++/LXkOvYzXYnsnXDkM6wYoj++R2H+7DhD/EDVi4ZZVABCAAWAVSAAOgF9BVGxszAR4eJIYlCRoMqj9SepPMmtq9aZlftWJ5n7VB0b0vXJbEydq/BxMvag7N6XrifSZO1efSpO1B3L0vXD+lS9qfSpe1B3L0vXD+lS9q9+lS9qDt3peuKMTJ2r9riJO1B171D/aTuWNpQXQqmKjBMTHQN3Rz2PQ9D6m/dWd+1fviydqD5ZxAmwsxjlWTDzxnkbqykciCPTRhoed6key9/JY/fUO33lbht6kAFGPnlBq4t6Ng/TlyzYWCe3ulmZXT92RRmX4Gqx2h7IMTmJgsq9FeXP8AJhGv4iqNTH7+mQarI/bPKBY/7NFP41Gdo7VkxFgxAW/hRRlQE9h1OvM3OtSzCeyTF3+t1XtG4U/zMpt8jVh7nbnRYJg64EGUf52SbiuPNbqFQ/uhaDj+yz2ePGy4zFoUYawwsBcHpJIOh7L8TrYC2qxwsTzGX41kqBSlKBSlKBSlKBSlKBSlKBSlKBSlKBSlKDy1MtKUH5KV5w68pQeGEV5wa9pQecAU4ApSgcAU4ApSgcAU4Ar2lAEApwhXtKAIhXvDFKUHuSvQtKUHuWlqUoPaUpQKUpQKUpQKUpQf/9k=',
    description: 'Perfect for small packages and documents that need quick delivery.',
    suitable: 'Documents, Small Packages, Food Delivery'
  },
  {
    id: 2,
    type: '3-Wheeler',
    weightCapacity: '20-100 KG',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1XAhjh4GwJ7v1AFHEOVys_OCUdTRL8Rh0eQ&s',
    description: 'Ideal for medium-sized goods requiring economical transportation.',
    suitable: 'Medium Packages, Multiple Items, Local Moving'
  },
  {
    id: 3,
    type: '4-Wheeler',
    weightCapacity: '100-5000 KG',
    image: 'data:image/jpeg;base64,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',
    description: 'Suitable for larger items and partial house moves at affordable rates.',
    suitable: 'Furniture, Appliances, Office Relocations'
  },
  {
    id: 4,
    type: 'Heavy Truck',
    weightCapacity: '5000-30000 KG',
    image: 'https://static.vecteezy.com/system/resources/previews/027/843/401/non_2x/a-cargo-truck-with-a-container-is-seen-driving-across-a-bridge-while-a-semi-truck-with-a-cargo-trailer-follows-closely-behind-photo.jpg',
    description: 'Designed for commercial goods and complete house relocations.',
    suitable: 'Full House Moving, Commercial Goods, Bulk Materials'
  }
];

const VehicleTypes = ({ recommendedType = null }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-dark-400">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our <span className="text-primary-500">Vehicle Types</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose the perfect transportation solution for your specific needs.
            We have various vehicle options to handle any size and weight.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {vehicleData.map((vehicle) => (
            <motion.div 
              key={vehicle.id}
              variants={itemVariants}
              className={`vehicle-card ${
                (recommendedType === vehicle.type || selectedVehicle === vehicle.id) ? 'recommended' : ''
              }`}
              onClick={() => setSelectedVehicle(vehicle.id === selectedVehicle ? null : vehicle.id)}
              whileHover={{ y: -8 }}
            >
              <div className="h-48 rounded-lg mb-4 overflow-hidden">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.type} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{vehicle.type}</h3>
              <p className="text-gray-400 mb-2">{vehicle.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="bg-dark-300 text-sm px-3 py-1 rounded-full text-primary-300">
                  {vehicle.weightCapacity}
                </span>
                {(recommendedType === vehicle.type) && (
                  <span className="bg-highlight-500/20 text-highlight-500 text-sm px-3 py-1 rounded-full">
                    Recommended
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VehicleTypes;